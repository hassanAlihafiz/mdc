import React from 'react'
import { useSelector } from 'react-redux'
import { RankBadge } from 'components/common'
import { varIs, varLabel } from 'common/var'
import { countryName } from 'common/country'
import { asDate } from 'utils/text'
import NoPhotoIcon from 'assets/images/user.svg'
import { Wrapper } from './DetailBox.styled'

export default function DetailBox(props) {
  const isOpenedDetailBox = useSelector(state=>state.binaryTree.isOpenedDetailBox)
  const detailBoxPosition = useSelector(state=>state.binaryTree.detailBoxPosition)
  const detailData = useSelector(state=>state.binaryTree.detailData)

  if (!isOpenedDetailBox) return ""

  return (
    <Wrapper style={{
      left: detailBoxPosition.left || 0,
      top: detailBoxPosition.top || 0,
    }}>
      <div className={'headerBar'}>
        <img className={'photo'} 
          src={detailData.image || NoPhotoIcon} 
        />
        <p className={'name'}>
          {`${detailData.first_name} ${detailData.last_name}`}
        </p>
        <p className={'userLink'}>
          {`#${detailData.uuid}`}
        </p>
        {varIs('user.type', detailData.type, 'affiliate') && 
          <p className={'userLink'}>
            <RankBadge label={detailData.rank.name} />
          </p>
        }
      </div>
      <table>
        <tbody>
          <tr>
            <td>Country</td>
            <td align={'right'}>
              {countryName(detailData.country)}
            </td>
          </tr>
          {props.page==='unilevel' && 
          <tr>
            <td>Enroller</td>
            <td align={'right'}>
              {detailData.enroller?.username}
            </td>
          </tr>
          }
          {props.page==='binary' && 
          <tr>
            <td>Placement</td>
            <td align={'right'}>
              {detailData.placement?.username}
            </td>
          </tr>
          }
          {props.page==='binary' && 
          <tr>
            <td>Sponsor</td>
            <td align={'right'}>
              {detailData.parent?.username}
            </td>
          </tr>
          }
          {props.page==='binary' && 
          <tr>
            <td>Leg</td>
            <td align={'right'}>
              {varLabel('user.legPosition', detailData.leg_position)}
            </td>
          </tr>
          }
          <tr>
            <td>Affiliates</td>
            <td align={'right'}>
              {detailData.qualification.pea}
            </td>
          </tr>
          <tr>
            <td>Customers</td>
            <td align={'right'}>
              {detailData.qualification.pep}
            </td>
          </tr>
          <tr>
            <td>Subscription</td>
            <td align={'right'}>
              {detailData.subscription_count}
            </td>
          </tr>
          <tr>
            <td>PV</td>
            <td align={'right'}>
              {detailData.qualification.pv}
            </td>
          </tr>
          {props.page==='unilevel' && 
          <tr>
            <td>Enroller Tree BV</td>
            <td align={'right'}>
              {detailData.qualification.gv}
            </td>
          </tr>
          }
          {props.page==='binary' && 
          <tr>
            <td>Left Binary BV</td>
            <td align={'right'}>
              {detailData.qualification.l_bgv}
            </td>
          </tr>
          }
          {props.page==='binary' && 
          <tr>
            <td>Right Binary BV</td>
            <td align={'right'}>
              {detailData.qualification.r_bgv}
            </td>
          </tr>
          }
          <tr>
            <td>Join Date</td>
            <td align={'right'}>
              {asDate(detailData.created_at)}
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}
