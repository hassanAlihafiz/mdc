import ScaleLoader from 'react-spinners/ScaleLoader'
import styled from 'styled-components'

export const Spin = (props) => {
  return (
    props.spinning?
    <Wrapper className={`container ${props.className}`}>
      <ScaleLoader className={'r'} size={150} loading={true} {...props.spinProps} />
      {props.description?
        <p className={`description`}>{props.description}</p>
      : ''}
    </Wrapper>
    : ''
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-color: ${props=>props.theme.palette.primary};
  > span{
    display: inherit;
  }
  > span > span {
    background-color: ${props=>props.theme.palette.primary};
  }
  .description {
    margin-bottom: 4px;
    margin-left: 12px;
    font-size: 18px;
  }
`
