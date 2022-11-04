import React from "react";
import { Row, Col } from "components/common";
import { Wrapper } from "./HighLifeTravelPage.styled";
import HeaderBgImage from "assets/images/hlt/header_bg.png";
import VacationsBgImage from "assets/images/hlt/vacations-bg.png";
import HotelsBgImage from "assets/images/hlt/hotels-bg.png";
import FlightsBgImage from "assets/images/hlt/flights-bg.png";
import ExcursionBgImage from "assets/images/hlt/excursions-bg.png";
import CruisesBgImage from "assets/images/hlt/cruises-bg.png";
import RentalsBgImage from "assets/images/hlt/rentals-bg.png";
import HltLogoImage from "assets/images/hlt/hlt_logo.png";
import DarkLogoImage from "assets/images/hlt/dark_logo.png";
import FooterImage from "assets/images/hlt/footer_bg.png";

export default function HighLifeTravelPage() {
  const travelsData = [
    {
      key: 1,
      title: "VACATIONS",
      content: "Members get access to Vacation Homes if they are traveling with a large group and want a more unique experience with the privacy of a home.",
      image: VacationsBgImage
    },
    {
      key: 2,
      title: "HOTELS",
      content: "Your membership provides access to over 1,000,000 hotels worldwide. Live comparison on hotels and up to 70% off public rates!",
      image: HotelsBgImage
    },
    {
      key: 3,
      title: "FLIGHTS",
      content: "Your membership offers you the ability to book flights in both money and Reward Credits. Booking flights with your membership helps you earn double or triple rewards each time you fly.",
      image: FlightsBgImage
    },
    {
      key: 4,
      title: "EXCURSIONS",
      content: "Choose from thousands of activities and excursions to add to your vacation!",
      image: ExcursionBgImage
    },
    {
      key: 5,
      title: "CRUISES",
      content: "Members can enjoy the excitement of cruising to exotic destinations around the world. You have access to all major cruise lines and will receive up to 15% back in reward credits.",
      image: CruisesBgImage
    },
    {
      key: 6,
      title: "CAR RENTALS",
      content: "Members can book a rental car the same day or in advance with pickup and drop-off locations available throughout the United States, Mexico, Canada, Europe, and anywhere they are traveling.",
      image: RentalsBgImage
    }
  ];

  return (
    <Wrapper>
      <div className="main-container">
        <div className="page-header">
          <img className="header-img" src={HeaderBgImage} />
          <img className="logo-img" src={HltLogoImage} />
        </div>
        <div className="high-life-travel">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
            <iframe className="sproutvideo-player" src="https://videos.sproutvideo.com/embed/4c9ddbb91b1decc6c4/d0361d9c83a61ebc" width="100%" height="100%" frameborder="0" allowfullscreen=""></iframe> 
            </Col>
            <Col xs={24} md={12}>
              <h3>High Life Travel Membership</h3>
              <p>High Life Travel gives you unlimited access to the largest travel savings membership portal on the planet. High Life Travel members get access to wholesale rates for flights, hotels, cruises, car rentals, luxury homes, weekly stays, and excursions to make your vacation an unforgettable experience. You'll even get Guest Passes so that you can share the savings with your friends and family.</p>
              <div className="button">
                <a href="https://bookings.highlifetravel.com/vacationclub/logincheck.aspx?Token=7196530b-64ee-4717-8f11-8768e64bd90c" target="_blank">PORTAL ACCESS</a>
              </div>
            </Col>
            <Col xs={24}>
              <Row gutter={[20, 20]} className="travel-courses">
                {travelsData.map((el) => (
                  <Col xs={24} sm={12} lg={8} xxl={6}>
                    <div className="center">
                      <div className="property-card">
                        <a href="#">
                          <div className="property-image" style={{ backgroundImage: `url(${el.image})` }}>
                          </div>
                        </a>
                        <div className="property-description">
                          <h5> {el.title} </h5>
                          <p>{el.content}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={24}>
              <img src={DarkLogoImage} className="footer-logo" />
            </Col>
            <Col xs={24}>
              <img src={FooterImage} className="footer-bg" />
            </Col>
            <Col xs={24}>
              <div className="footer">
                <p>Living The High Life Has Its Perks! Download the HLT Members Guide and HLT Presentation to discover everything there is to know about your High Life Travel Membership!</p>
                <a href="#">Download HLT Presentation Download Members Guide</a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Wrapper>
  );
}
