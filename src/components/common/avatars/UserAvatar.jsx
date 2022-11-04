import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { ReactComponent as NophotoIcon } from 'assets/images/user.svg';

const UserAvatar = (props) => {
  return (
    <Wrapper>
      <div className={'image-root'}>
        {props.image ? (
          <img
            className={`image`}
            src={props.image}
            width={props.width || 28}
            height={props.height || 28}
            alt=""
          />
        ) : (
          <NophotoIcon className={`image`} />
        )}
        {props.status?
          <div className={`status-badge ${props.status}`} />
        : ''}
      </div>      
      <div className={'content-root'}>
        <div className='title'>
          {props.link ? 
            <Link to={props.link}>{props.title}</Link>
          : <span>{props.title}</span>}
        </div>
        {(props.type || props.joinDate)?
          <div className='subtitle'>
            <span className='type'>
              {props.typeLabel}
            </span>
            <span className='join-date'>
              {props.joinDate}
            </span>
          </div>
        : ''}
      </div>      
    </Wrapper>
  );
};

export default UserAvatar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .image-root {
    position: relative;
    width: 32px;
    margin-right: 4px;
  }
  .image {
    width: 28px;
    height: 28px;
    margin-right: 8px;
    border-radius: 50%;
    object-fit: cover;
  }
  .status-badge {
    position: absolute;
    right: 2px;
    bottom: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: lightgrey;
    &.active {
      background-color: ${props=>props.theme.palette.success};
    }
    &.hold {
      background-color: ${props=>props.theme.palette.warning};
    }
    &.suspended {
      background-color: ${props=>props.theme.palette.error};
    }
  }  
  .content-root {
    // width: 160px;
  }
  .title {
    font-size: 14px;
    line-height: 1em;
  }
  .subtitle {
    font-size: 12px;
    display: flex;
    align-items: center;
    .join-date {
      margin-left: 12px;
      color: ${props=>props.theme.palette.secondaryText};
    }
  }  
`
