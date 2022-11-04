import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { Card, Input, Button } from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { asUsdPrice } from 'utils/text'
import { ReactComponent as DarkRightIcon } from "assets/icons/dark-right.svg"
import { PlusOutlined as PlusIcon, MinusOutlined as MinusIcon } from '@ant-design/icons'
import { useDispatch } from 'react-redux';

export default function ProductList() {
  const [products, setProducts] = useState([])
  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }  

  const onGetProducts = (res) => {
    setProducts(res.data)
  }
  const onFailProducts = () => { }
  const loadProducts = () => {
    callGetApiWithAuth(`my_account/gift_wallet/products`, 
      onGetProducts, onFailProducts
    )
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Card>
      <Wrapper>
        <div className={'header'}>
          <h4 className={'title'}>
            Gift Cards
          </h4>
        </div>
        <div className={'slider-box'}>
          <Slider {...sliderSetting}>
            {products.map((el, index) => (
              <div key={index}>
                <ProductCard data={el} />
              </div>
            ))}            
          </Slider>
        </div>
      </Wrapper>
    </Card>
  )
}

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <DarkRightIcon
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <DarkRightIcon
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const ProductCard = ({ data }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)

  const decreaseQty = () => {
    if (quantity>1) setQuantity(quantity-1)
  }
  const increaseQty = () => {
    setQuantity(quantity*1+1)
  }

  const handleAdd = () => {
    dispatch({
      type: 'checkout.ADD_CART',
      payload: {
        product: data,
        quantity: quantity,
        pay_cycle: 0,
        contained_products: []
      }
    })
  }

  return (
    <ProductWrapper>
      <div className='product-img'>
        <img src={data.image_path} />
      </div>
      <div className='product-title'>
        {data.title}
      </div>
      <div className='price'>
        {`${asUsdPrice(data.member_price)}`}
      </div>
      <div className='action-root'>
        <div className='qty-root'>
          <MinusIcon onClick={decreaseQty} />
          <Input type={'number'}
            value={quantity}
            onChange={e=>setQuantity(e.target.value)}
          />
          <PlusIcon className={'plus-icon'}
            onClick={increaseQty}
          />
        </div>
        <Button onClick={handleAdd}>
          Add To Cart
        </Button>
      </div>
    </ProductWrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .slider-box {
    margin: 0 -10px;
  }
  .slick-next {
    position: absolute;
    top: -31px;
    right: 10px;
    width: 26px;
  }
  .slick-prev {
    position: absolute;
    top: -41.5px;
    left: calc(100% - 90px);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    width: 26px;
  }
  .slick-disabled {
    opacity: 0.5;
  }
  .slick-slide {
    padding: 0 10px;
  }
  .title {
    font-size: 18px;
  }
`

const ProductWrapper = styled.div`
  border: 1px solid rgba(127,143,163,0.4);
  box-sizing: border-box;
  border-radius: 4px;
  padding: 20px;
  .product-img {
    img {
      width: 100%;
    }
  }
  .product-title {
    font-weight: bold;
    margin: 15px 0px 11px;
    font-size: 18px;
    text-align: center;
  }
  .price {
    font-weight: normal;
    font-size: 14px;
    color: #00b4ee;
    text-align: center;
  }
  .action-root {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .qty-root {
    position: relative;
    width: calc(50% - 6px);
    .anticon {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 12px;
      z-index: 12;
      &.plus-icon {
        left: auto;
        right: 12px;
      }      
    }
    .ant-input {
      text-align: center;
      padding: 0 30px;
    }    
  }
  .ant-btn { 
    width: calc(50% - 6px);
    background: #384971;
    border-radius: 2px;
    outline-color: #384971;
    border-color: #384971;
  }

`
