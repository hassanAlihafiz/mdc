import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { RankBadge, Tooltip } from 'components/common'
import { varLabel, varKey, varIs } from 'common/var'
import { Wrapper } from './TreeNode.styled'
import NoUserIcon from 'assets/images/user.svg'
import { ReactComponent as ShowMoreIcon } from 'assets/icons/eye.svg'
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { BsChatDots } from 'react-icons/bs'
import { LoadingOutlined } from '@ant-design/icons'
import { callGetApiWithAuth } from 'utils/api'

export default function TreeNode({ nodeData, ...props }){
  const history = useHistory()
  const dispatch = useDispatch()
  const nodeRef = useRef(null)
  const previousSearchingUserIds = useSelector(state=>state.binaryTree.previousSearchingUserIds)
  const [isLoadingDownliner, setIsLoadingDownliner] = useState(false)
  const [clickedUser, setClickedUser] = useState([])

  const openDetail = () => {
    let position_ = nodeRef.current.getBoundingClientRect()
    let detailBoxPosition = {
      top: position_.top,
      left: position_.left+110,
    }
    dispatch({ type: 'binaryTree.OPEN_DETAIL_BOX', payload: { detailBoxPosition, detailData: nodeData } })
  }
  const closeDetail = () => {
    dispatch({ type: 'binaryTree.CLOSE_DETAIL_BOX'})
  }
  const openAddDialog = () => {
    
  }
  const showMore = (user_id) => {
    dispatch({ type: 'binaryTree.SEARCH', payload: { user_id } })
  }
  const searchBack = () => {
    dispatch({ type: 'binaryTree.SEARCH_BACK' })
  }

  const onSuccessGetDownliner = ({ data }) => {
    setIsLoadingDownliner(false)
    if (data && data.length > 0) {
      history.push({
        pathname: '/team_chat',
        state: {
          user: data, 
        },
      });
    }
  }

  const onClickChat = (user) => {
    setClickedUser(user);
    setIsLoadingDownliner(true);
    callGetApiWithAuth(`common/search_enroll_downline_affiliate/${user.username}`, onSuccessGetDownliner, () => {
      setIsLoadingDownliner(false)
    });
  }
  
  return (
    <Wrapper>
    {nodeData.is_empty?
      <>
        <div className={'emptyContainer'} />
        {/* <AddButton onClick={openAddDialog} /> */}
      </>
    :  
      <div className={'container'} ref={nodeRef} 
        onMouseEnter={openDetail} onMouseLeave={closeDetail}
      >
        {varIs('user.type', nodeData.type, 'affiliate') && 
          <span className='chat-icon'>
            {(isLoadingDownliner && nodeData.id*1 === clickedUser.id*1) ?
              <LoadingOutlined />
              :
              <BsChatDots onClick={() => onClickChat(nodeData)} />
            }
          </span>
        }
        {(nodeData.level==0 && previousSearchingUserIds.length>0) &&
          <BackIcon className={'searchBackButton'} onClick={() => searchBack()} />
        }
        <div className={`coloredTopBorder ${nodeData.type!=1?'coloredTopBorderForCustomer':''}`} ></div>
        <div className={'photoWrapper'}>
          <img src={nodeData.image || NoUserIcon} />
          <div className={`statusBadge ${varKey('user.status', nodeData.status)}`} />
        </div>
        <Tooltip title={`${nodeData.first_name} ${nodeData.last_name}`}>
          <p className={'userRow'}>
            {`${nodeData.first_name} ${nodeData.last_name}`}
          </p>
        </Tooltip>
        <p className={'userRow'}>
          #{nodeData.uuid}          
        </p>
        <Tooltip title={nodeData.username}>
          <p className={`userRow`}>
              {nodeData.username}
          </p>
        </Tooltip>
        {varIs('user.type', nodeData.type, 'affiliate') && 
          <p className={'userRow'}>
            <RankBadge
              label={nodeData.rank.name}
            />
          </p>
        }
        {/*
        ((!nodeData.children || nodeData.children.length==0) && !nodeData.hasChildren) && 
          <AddButton onClick={openAddDialog} />
        */}
        {(!nodeData.children && nodeData.hasChildren) &&
          <ShowMoreIcon className={'showMoreButton'} onClick={() => showMore(nodeData.id)} />
        }
      </div>
    }
    </Wrapper>
  )
}
