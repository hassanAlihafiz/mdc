import React, { useState } from "react";
import { Row, Col, Modal } from "components/common";
import AirlinePilotImg from "assets/images/akashx/coinzoom_academy/cashflow/airpilot.png";
import BartenderImg from "assets/images/akashx/coinzoom_academy/cashflow/bartender.png";
import BusinessManagerImg from "assets/images/akashx/coinzoom_academy/cashflow/business_manager.png";
import DoctorImg from "assets/images/akashx/coinzoom_academy/cashflow/doctor.png";
import EngineerImg from "assets/images/akashx/coinzoom_academy/cashflow/engineer.png";
import JanitorImg from "assets/images/akashx/coinzoom_academy/cashflow/janitor.png";
import LawyerImg from "assets/images/akashx/coinzoom_academy/cashflow/lawyer.png";
import MechanicImg from "assets/images/akashx/coinzoom_academy/cashflow/mechanic.png";
import NurseImg from "assets/images/akashx/coinzoom_academy/cashflow/nurse.png";
import PoliceOfficerImg from "assets/images/akashx/coinzoom_academy/cashflow/police_officer.png";
import SecretaryImg from "assets/images/akashx/coinzoom_academy/cashflow/secretary.png";
import TeacherImg from "assets/images/akashx/coinzoom_academy/cashflow/teacher.png";
import TruckDriverImg from "assets/images/akashx/coinzoom_academy/cashflow/truck_drive.png";
import AirlinePilotDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/airpilot_details.png";
import BartenderDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/bartender_details.png";
import BusinessManagerDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/business_manager_details.png";
import DoctorDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/doctor_details.png";
import EngineerDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/engineer_details.png";
import JanitorDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/janitor_details.png";
import LawyerDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/lawyer_details.png";
import MechanicDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/mechanic_details.png";
import NurseDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/nurse_details.png";
import PoliceOfficerDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/police_officer_details.png";
import SecretaryDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/secretary_details.png";
import TeacherDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/teacher_details.png";
import TruckDriverDetailsImg from "assets/images/akashx/coinzoom_academy/cashflow/truck_drive_details.png";
import styled from "styled-components";

export default function CashflowExamplesSection(props) {
  const cashFlowExamples = [
    {
      value: 1,
      key: "airline_pilot",
      image: AirlinePilotImg,
      detail_image: AirlinePilotDetailsImg
    },
    {
      value: 2,
      key: "bartender",
      image: BartenderImg,
      detail_image: BartenderDetailsImg
    },
    {
      value: 3,
      key: "business_manager",
      image: BusinessManagerImg,
      detail_image: BusinessManagerDetailsImg
    },
    {
      value: 4,
      key: "doctor",
      image: DoctorImg,
      detail_image: DoctorDetailsImg
    },
    {
      value: 5,
      key: "engineer",
      image: EngineerImg,
      detail_image: EngineerDetailsImg
    },
    {
      value: 6,
      key: "janitor",
      image: JanitorImg,
      detail_image: JanitorDetailsImg
    },
    {
      value: 7,
      key: "lawyer",
      image: LawyerImg,
      detail_image: LawyerDetailsImg
    },
    {
      value: 8,
      key: "mechanic",
      image: MechanicImg,
      detail_image: MechanicDetailsImg
    },
    {
      value: 9,
      key: "nurse",
      image: NurseImg,
      detail_image: NurseDetailsImg
    },
    {
      value: 10,
      key: "police_officer",
      image: PoliceOfficerImg,
      detail_image: PoliceOfficerDetailsImg
    },
    {
      value: 11,
      key: "secretary",
      image: SecretaryImg,
      detail_image: SecretaryDetailsImg
    },
    {
      value: 12,
      key: "teacher",
      image: TeacherImg,
      detail_image: TeacherDetailsImg
    },
    {
      value: 13,
      key: "truck_driver",
      image: TruckDriverImg,
      detail_image: TruckDriverDetailsImg
    },
  ];

  const [selectedDetailImg, setSelectedDetailImg] = useState(undefined);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        {cashFlowExamples.map((el) => (
          <Col xs={24} sm={12} md={8} lg={6} key={el.key}>
            <div class="flip flip-vertical" onClick={() => setSelectedDetailImg(el.detail_image)}>
              <div class="front">
                <img src={el.image} />
              </div>
              <div class="back">
                <img src={el.image} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {selectedDetailImg &&
        <Modal
          centered
          footer={null}
          visibile={true}
          width={1000}
          onCancel={() => setSelectedDetailImg(undefined)}
          className="cashflow-detail-modal"
        >
          <div className="detail-img">
            <img src={selectedDetailImg} />
          </div>
        </Modal>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  .flip {
    position: relative;
    box-shadow: 2px 5px 5px 0px rgb(189 189 189 / 30%);
    border: 1px solid #d9d9d9;
    cursor: pointer;
  }
  .flip img {
    width: 100%;
  }
  
  .flip>.front, .flip>.back {
    display: block;
    transition-timing-function: cubic-bezier(.175, .885, .32, 1.275);
    transition-duration: .5s;
    transition-property: transform, opacity;
  }
  
  .flip>.front {
    transform: rotateY(0deg);
  }
  
  .flip>.back {
    position: absolute;
    opacity: 0;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg);
  }
  
  .flip:hover>.front {
    transform: rotateY(180deg);
  }
  
  .flip:hover>.back {
    opacity: 1;
    transform: rotateY(0deg);
  }
  
  .flip.flip-vertical>.back {
    transform: rotateX(-180deg);
  }
  
  .flip.flip-vertical:hover>.front {
    transform: rotateX(180deg);
  }
  
  .flip.flip-vertical:hover>.back {
    transform: rotateX(0deg);
  }
  
  .flip {
    position: relative;
    display: inline-block;
  }
  
  .flip>.front, .flip>.back {
    display: block;
    color: white;
    width: inherit;
    background-size: cover !important;
    background-position: center !important;
    padding: 10px;
    border-radius: 2px;
  }
  
  .flip>.front p, .flip>.back p {
    font-size: 0.9125rem;
    line-height: 160%;
    color: #999;
  }
  
  .text-shadow {
    text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04), 3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04), 0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04), 7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04), 9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04), 11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04), 13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04), 0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04), 17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04), 19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);
  }
`