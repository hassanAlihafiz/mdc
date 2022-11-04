import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    background-color: #ffffff;
    padding-bottom: 20px;
    .page-header {
      position: relative;
      .logo-img {
        position: absolute;
        left: calc(50% - 15%);
        width: 30%;
      }
    }
    .header-img {
      width: 100%;
    }
    .high-life-travel {
      padding: 20px;
      margin-top: 20px;
      h3 {
        font-weight: 600;
        margin-top: 30px;
      }
      iframe {
        width: 100%;
        min-height: 400px;
      }
      .button {
        margin: 25px 0;
        width: 100%;
        padding: 0;
        a {
          color: #ffffff;
          background-color: #00b2ff;
          padding: 12px 30px;
          border-radius: 2px;
        }
      }
      .travel-courses {
        margin: 30px 0;
        justify-content: center;
      }
      .center {
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .property-card {
        min-height: 350px;
        width: 100%;
        display:-webkit-box;
        display:-ms-flexbox;
        display:flex;
        -webkit-box-orient:vertical;
        -webkit-box-direction:normal;
        -ms-flex-direction:column;
        flex-direction:column;
        position:relative;
        -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        border-radius:5px;
        overflow:hidden;
        -webkit-box-shadow:  15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
        box-shadow:  15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
      }
      .property-image {
        height: 150px;
        width: 100%;
        padding:1em 2em;
        position:Absolute;
        top:0px;
        -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        background-size:cover;
        background-repeat:no-repeat;
      }
      .property-description {
        background-color: #FAFAFC;
        width: 100%;
        top: 150px;
        position:absolute;
        bottom:0em;
        -webkit-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        -o-transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition:all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        padding: 0.5em 1em;
        text-align:center;
      }
      .property-description h5 {
        margin-top: 20px;
      }
      .property-description p {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        min-height: 48px;
      }
      .property-card:hover .property-description {
        height:0em;
        padding:0px 1em;
        top: 100%;
      }
      .property-card:hover .property-image {
        height: 100%;
      }
      .property-card:hover .property-social-icons {
        background-color:white;
      }
      .property-card:hover .property-social-icons:hover {
        background-color:blue;
        cursor:pointer;
      }
      .footer-logo {
        margin: 30px auto;
        display: block;
        max-width: 400px;
        width: 100%;
      }
      .footer-bg {
        margin: 0 auto;
        display: block;
        width: 100%;
        max-width: 800px;
      }
      .footer {
        text-align: center;
        padding: 30px;
        margin-top: 30px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
      }
      .footer a {
        color: #05c1ff;
      }
    }
    @media only screen and (max-width: 767px) {
      .high-life-travel iframe {
        min-height: 300px;
      }
    }
  }
`;
