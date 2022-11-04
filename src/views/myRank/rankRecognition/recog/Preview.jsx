import React from 'react'
import { CommonWrapper } from './templates/CommonTemplate.styled'
import Aaron25KTemplate from './templates/Aaron25KTemplate'
import Amaka250KTemplate from './templates/Amaka250KTemplate'
import Aron500KTemplate from './templates/Aron500KTemplate'
import Juan1KTemplate from './templates/Juan1KTemplate'
import JudySuperTemplate from './templates/JudySuperTemplate'
import Pryme50KTemplate from './templates/Pryme50KTemplate'
import Tiffany5KTemplate from './templates/Tiffany5KTemplate'
import Tina100KTemplate from './templates/Tina100KTemplate'
import Toni10KTemplate from './templates/Toni10KTemplate'

export default function Preview(props) {

  return (
    <CommonWrapper id='recogPreview'
      style={{fontSize: '1px'}}
    >
      <div style={{width: '100%', height: '100%'}}>
        {props.user.rank_id === 5 && 
        <Juan1KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 6 && 
        <Tiffany5KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 7 && 
        <Toni10KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 8 && 
        <Aaron25KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 9 && 
        <Pryme50KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 10 && 
        <Tina100KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 11 && 
        <Amaka250KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 12 && 
        <Aron500KTemplate
          user={props.user}
          photo={props.photo}
        />
        }
        {props.user.rank_id === 13 && 
        <JudySuperTemplate
          user={props.user}
          photo={props.photo}
        />
        }
      </div>
    </CommonWrapper>
  )
}
