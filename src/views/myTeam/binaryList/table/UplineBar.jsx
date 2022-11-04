import React from 'react'
import styled from 'styled-components'
import RightOutlinedIcon from '@ant-design/icons/RightOutlined'

export default function UplineBar(props) {

  return (
    <Wrapper>
      {props.uplines.map((el, index) => 
        <>
          <div className={'breadcrumb'}>
            <a href="javascript:void(0)"
              onClick={() => props.goUser(el)}
            >
              {el.username}
            </a>
          </div>
          {index<props.uplines.length-1 &&
            <div className={'breadcrumbSplit'}>
              <RightOutlinedIcon />
            </div>
          }
        </>
      )}      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  .breadcrumb {
    font-size: 14px;
    color: ${props=>props.theme.palette.secondartText};
    cursor: pointer;
  }
  .breadcrumbSplit {
    padding: 0 8px;
    font-size: 12px;
    line-height: 14px;
  }
`
