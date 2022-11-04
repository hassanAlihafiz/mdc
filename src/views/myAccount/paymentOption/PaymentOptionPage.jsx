import React, { useState, useEffect } from "react";
import { 
  Row, Col, Spin, 
  Radio, Input, Button 
} from "components/common";
import { callGetApiWithAuth } from 'utils/api'
import IpayoutOptionCard from "./IpayoutOptionCard";
import NachaOptionCard from "./NachaOptionCard";
import CoinZoomOptionCard from "./CoinZoomOptionCard";
import TwBatchOptionCard from "./TwBatchOptionCard";
import MxBatchOptionCard from "./MxBatchOptionCard";
import UaBatchOptionCard from "./UaBatchOptionCard";
import RuBatchOptionCard from "./RuBatchOptionCard";
import { Wrapper } from "./PaymentOptionPage.styled";

export default function PaymentOptionPage() {
  const [providers, setProviders] = useState([])
  const [activeSetting, setActiveSetting] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const onGetListData = (res) => { 
    setIsLoading(false)
    setProviders(res.data.providers)
    setActiveSetting(res.data.active_payout_setting)
  }
  const onFailListData = () => {
    setIsLoading(false)
  }
  const loadListData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`my_account/payment_option/list`,
      onGetListData, onFailListData
    )
  }

  useEffect(() => {
    loadListData()
  }, [])

  return (
    <Wrapper>
      {isLoading ?
        <Spin spinning={true} />
      : 
      <>
        <div className="main-container">
          <div className="top-card-section">
            <div className="card-title">
              MyDailyChoice Makes It Easy To Get Paid!
            </div>
            <div className="card-description">
              IMPORTANT: To Claim Your Commissions, You MUST Select One of the
              Following Options. You Will not receive your commissions until you
              select how you would like to be paid.
            </div>
          </div>

          {providers.map(provider => (
          <>
            {provider.name === 'iPayout' && 
              <IpayoutOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
            {provider.name === 'Nacha' && 
              <NachaOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
            {provider.name === 'CoinZoom' && 
              <CoinZoomOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
            {provider.name === 'TwBatch' && 
              <TwBatchOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
            {provider.name === 'MxBatch' && 
              <MxBatchOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
            {provider.name === 'UaBatch' && 
              <UaBatchOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
            {provider.name === 'RuBatch' && 
              <RuBatchOptionCard 
                provider={provider}
                isActive={activeSetting && 
                  provider.id===activeSetting.provider_id
                }
                loadListData={loadListData}
              />
            }
          </>
          ))}
        </div>
      </>}
    </Wrapper>
  );
}
