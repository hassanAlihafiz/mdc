import React from "react";
import { Button, SuccessNotification } from "components/common";
import { ReactComponent as LinkedInIcon } from "assets/icons/linkedin_website.svg";
import { ReactComponent as TwitterIcon } from "assets/icons/twitter_website.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/facebook_website.svg";
import { ReactComponent as MailIcon } from "assets/icons/mail_website.svg";
import WebsiteImage from "assets/images/website.png";
import { FacebookProvider, Share as FacebookShare } from "react-facebook";
import { default as TwitterShareLink } from "react-twitter-share-link";
import { default as LinkedinShareLink } from "react-linkedin-share-link";
import EmailShare from "react-email-share-link";
import { Wrapper } from "./YourWebsite.styled";

export default function YourWebsite({ data }) {
  const copyWebsiteLink = () => {
    SuccessNotification("Successfully copied to clipboard");
    navigator.clipboard.writeText(data.url);
  };

  return (
    <Wrapper>
      <div className="website-details">
        <img src={data.image} className="website-image" />
        <div className="website-title">Your Website Link</div>
        <div className="website-url">
          {data.url}
        </div>
        <div className="sharable-container">
          <div className="sharable-links">
            <LinkedinShareLink
              link={data.url}
            >
              {(link) => (
                <a href={link} target="_blank">
                  <LinkedInIcon color="primary" className="social-icons" />
                </a>
              )}
            </LinkedinShareLink>
            <TwitterShareLink
              link={data.url}
            >
              {(link) => (
                <a href={link} target="_blank">
                  <TwitterIcon color="primary" className="social-icons" />
                </a>
              )}
            </TwitterShareLink>
            <FacebookProvider appId="123456789">
              <FacebookShare
                href={data.url}
              >
                {({ handleClick, loading }) => (
                  <a onClick={(e) => !loading && handleClick(e)}>
                    <FacebookIcon color="primary" className="social-icons" />
                  </a>
                )}
              </FacebookShare>
            </FacebookProvider>
            <EmailShare
              email=""
              body={data.url}
              subject={`Invitation URL`}
            >
              {(link) => (
                <a href={link} data-rel="external">
                  <MailIcon color="primary" className="social-icons" />
                </a>
              )}
            </EmailShare>
          </div>
        </div>
        <div className="divider" />
      </div>
      <div className="website-button">
        <Button onClick={copyWebsiteLink}>Copy Website Link</Button>
      </div>
    </Wrapper>
  );
}
