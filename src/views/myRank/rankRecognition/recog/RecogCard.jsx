import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import html2canvas from 'html2canvas'
import {
  Card, Row, Col, Spin, Alert,
  Dropzone, SuccessNotification
} from 'components/common'
import { 
  callGetApiWithAuth,
  callPostApiWithAuth 
} from 'utils/api'
import UploadImg from 'assets/images/upload.png'
import Preview from './Preview'
import Lightbox from './Lightbox'

export default function RecogCard() {
  const myUser = useSelector(state=>state.auth.user)
  const [photo, setPhoto] = useState(undefined)
  const [recogs, setRecogs] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRecog, setSelectedRecog] = useState(undefined)
  
  const onGetRecogs = (res) => {
    setRecogs(res.data)
    setIsLoading(false)
  }
  const onFailRecogs = () => {
    setIsLoading(false)
  }
  const loadRecogs = () => {
    setIsLoading(true)
    callGetApiWithAuth(`my_rank/rank_recognition/recogs`, 
      onGetRecogs, onFailRecogs
    )
  }
  const handleOpenImage = async (files) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      setPhoto(fileReader.result)      
    }    
  }
  const onUploadDone = (res) => {
    setIsUploading(false)
    SuccessNotification(res.message)
    loadRecogs()
  }
  const onUploadFail = () => {
    setIsUploading(false)
  }
  const onOpenedImage = async () => {
    const canvas = await html2canvas(document.getElementById('recogPreview'));    
    let image = canvas.toDataURL("image/png", 1.0);
    image = image.replace('data:image/png;base64,', '')    
    callPostApiWithAuth(`my_rank/rank_recognition/upload_recog`, 
      { image }, onUploadDone, onUploadFail
    )
  }

  useEffect(() => {
    if (photo) {
      setIsUploading(true)
      setTimeout(() => {
        onOpenedImage()
      }, [1000])
    }
  }, [photo])

  useEffect(() => {
    loadRecogs()
  }, [])

  return (
    <Wrapper>
      <Card>
        <div className='upper-root'>
          <div className='uploader-root'>
            <h4>Upload Your Photo</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className='alert-root'>
              <Alert type="error" 
                showIcon
                style={{ alignItems: 'baseline' }}
                message={"It's not possible to edit rank recognition image on mobile device"}
              />
            </div>
            {isUploading?
              <div className='loadingRoot'>
                <Spin spinning={true} />
                <p>Uploading now...</p>
              </div>
            :
            myUser.rank_id>=5?
            <div className={'file-outroot'}>
              <Dropzone
                onDrop={handleOpenImage}
                accept='image/*'
              >
                {({ getRootProps, getInputProps }) => (
                  <div className='file-container' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={UploadImg} />
                    <span className='title'>
                      Upload your photo
                    </span>
                  </div>
                )}
              </Dropzone>
              <p style={{marginTop: 24}}>
                Upload no-background image in PNG file format.
              </p>
              <p>
                You can remove image backgrounds automatically in 5 seconds with just one click here: 
                <a href='https://www.remove.bg/' target='_blank'>
                  https://www.remove.bg/
                </a>
              </p>
            </div>
            : 
            <Alert type="error" 
              showIcon
              style={{ alignItems: 'baseline' }}
              message={"You should have at least 1K Rank to edit recognition photo."}
            />
            }
          </div>
          <div className='history-root'>
            <h3>History({recogs.length})</h3>
            {isLoading?
              <div className='loadingRoot'>
                <Spin spinning={true} />
              </div>
            : 
              <div className='recog-list'>
                <Row gutter={[20, 20]}>
                  {recogs.map(el => (
                    <Col xs={8} xl={6}>
                      <img src={el.image} 
                        onClick={()=>setSelectedRecog(el)}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            }
            {selectedRecog && 
              <Lightbox 
                selectedRecog={selectedRecog}
                setSelectedRecog={setSelectedRecog}
              />
            }
          </div>
        </div>
      </Card>
      <div style={{height: 24}} />
      {myUser.rank_id>=5 && 
      <div className='preview-outroot'>
        <Card>
          <div className='preview-root'>
            <Preview 
              user={myUser}
              photo={photo}
            />
          </div>
        </Card>
      </div>
      }
      <div style={{height: 24}} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .upper-root {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }  
  .preview-root {
    margin: 0 auto;
    width: 1000px;
    height: 1000px;    
  }
  .preview-outroot {
    h4 {
      font-size: 18px;
      font-weight: 500;
    }
    @media (max-width: 1365px) {
      display: none;
    }
  }
  .file-outroot {
    @media (max-width: 1365px) {
      display: none;
    }
  }
  .alert-root {
    display: none;
    @media (max-width: 1365px) {
      display: block;
    }
  }
  .uploader-root {
    width: calc(100% - 930px);
    @media (max-width: 1600px) {
      width: calc(100% - 620px);
    }
    @media (max-width: 1366px) {
      width: calc(100% - 420px);
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    h4 {
      font-size: 18px;
      font-weight: 500;
    }
    p {
      font-size: 14px;
      line-height: 1.15em;
      color: ${props=>props.theme.palette.secondaryText};
    }
    .file-container {
      background-color: #F3F5F8;
      width: 300px;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 54px;
        height: 54px;
      }
      .title {
        margin-top: 10px;
        font-size: 16px;
        color: ${props=>props.theme.palette.secondaryText};
      }
    }
    .loadingRoot {
      width: 300px;
      height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .history-root {    
    width: 900px;
    padding-left: 20px;
    border-left: 2px solid #eff3f6;
    @media (max-width: 1600px) {
      width: 600px;
    }
    @media (max-width: 1366px) {
      width: 400px;
    }
    @media (max-width: 768px) {
      margin-top: 20px;
      width: 100%;
      padding-left: 0;
      border-left: 0 none;
    }
    h3 {
      font-size: 16px;
      font-weight: 500;
      color: ${props=>props.theme.palette.secondaryText};
      margin-bottom: 12px;
    }
    .loadingRoot {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;      
    }
    .recog-list {
      height: 400px;
      overflow-x: hidden;
      overflow-y: auto;
      img {
        width: 100%;
        cursor: pointer;
      }
      @media (max-width: 768px) {
        height: auto;
      }
    }    
  }
`
