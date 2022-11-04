import React from "react";
import { Row, Col, Alert } from "components/common";
import { Wrapper } from "./LeadsAndTrafficPage.styled";
import BuyLeadsImage from "assets/images/leads_and_traffic/buy_leads.png";
import BuyTrafficImage from "assets/images/leads_and_traffic/buy_traffic.jpg";

export default function LeadsAndTrafficPage() {

  return (
    <Wrapper>
      <div className="main-container">
        <h3 className="welcome-title">Welcome To The Leads And Traffic Section!</h3>
        <Alert type="info" message="At MyDailyChoice, we have gone above and beyond to offer our Affiliates the very best resources, training, and tools. We have developed a lead generation program that could help you sponsor MORE people into your organization! Of course, when it comes to generating leads for your business, the best way is through WARM MARKET and following the training in your MyDailyChoice Starter Kit. However, if you've ran out of options, you may find some success with this lead generation program. Please DO NOT purchase leads and/or traffic until you have watched ALL of the training videos below." />
        <div className="todd-falcone-content">
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <h3>Todd Falcone Video Training Series</h3>
            </Col>
            <Col xs={24}>
              <p>Welcome to your world-class video training series with <strong>Todd Falcone</strong>!</p>
              <p>Todd Falcone has over 25 years of experience in the profession of network marketing and direct selling. Over the past decade, he has dedicated a majority of his time speaking, teaching and training on the subject of network marketing success.</p>
              <p>He regularly conducts conference calls, webinars and live training events in front of tens of thousands of people in the United States, Canada, Europe, Asia and other countries throughout the world!</p>
            </Col>
            <Col xs={24}>
              <iframe width="100%" height="100%" className="sproutvideo-playlist" src="//videos.sproutvideo.com/playlist/799bddb61df4/46469a7de7ae8222" frameborder="0" allowfullscreen=""></iframe>
            </Col>
            <Col xs={24} className="button">
              <a href="https://toddfalcone.isrefer.com/go/AllProd/mlmcoach/" target="_blank">Visit Todd's Training Store</a>
            </Col>
          </Row>
        </div>
        <div className="buy-leads-content">
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <h3>Buy Leads</h3>
            </Col>
            <Col xs={24} xl={12}>
              <img src={BuyLeadsImage} />
              <p>Ready to get high quality leads and traffic? We have integrated directly with a top lead generation company to offer you high quality pre-qualified leads. They offer Phone Interviewed Leads, Long Form Leads, Local Leads, Travel Leads, Weight Loss Leads, Exclusive Nationwide Leads, and more. You can also get clicks driven right to your MDC Capture Pages!</p>
              <p>Each time your purchase a lead, you can enter your MyDailyChoice username upon checkout. By doing so, the leads will drop right into your contact manager in the back office! That means that by purchasing leads, you are not only able to expose more people, but you are building your success line of pre-enrollees. If you're looking to build your business through cold marketing and lead generation, look no further!</p>
              <div className="button">
                <a href="http://www.capturepagetraffic.com/" target="_blank">Buy Leads</a>
              </div>
            </Col>
            <Col xs={24} xl={12}>
              <iframe className="sproutvideo-player" src="//videos.sproutvideo.com/embed/a49ad0b91a19e3c22c/b90e7023210d8b74" width="100%" height="100%" frameborder="0" allowfullscreen=""></iframe>
            </Col>
          </Row>
        </div>
        <div className="buy-traffic-content">
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <h3>Buy Leads</h3>
            </Col>
            <Col xs={24} xl={12}>
              <iframe className="sproutvideo-player" src="//videos.sproutvideo.com/embed/e89ad0b91a18e5ca60/8cef04428c8df5ea" width="100%" height="100%" frameborder="0" allowfullscreen=""></iframe>
            </Col>
            <Col xs={24} xl={12}>
              <img src={BuyTrafficImage} />
              <p>Traffic Authority has been supplying premium traffic to private clients for the past 18 years and has some of the highest quality converting traffic available for online business opportunities. Their traffic is 100% USA and Canada based and you are in complete control of your traffic. You purchase clicks, your submit your CAPTURE PAGE URL, and they will start delivering real-time traffic to your website. You can change your link, pause, or start your order at any time.</p>
              <div className="button">
                <a href="http://mdc.trafficauthority.net/" target="_blank">Buy Traffic</a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Wrapper>
  );
}
