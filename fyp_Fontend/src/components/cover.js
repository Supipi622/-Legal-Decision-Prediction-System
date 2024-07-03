import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faHackerrank,
  faFacebook, 
} from "@fortawesome/free-brands-svg-icons";
import Fade from "react-reveal/Fade";

const Cover = () => {
  return (
    <div className="bg-div" id="home">
      <div className="head mx-5">
        <div className="head-div mx-auto main-div">
          <Fade top cascade>
            <section className="div-1">
              {/* <h1 className="my-1 head-div-first-text">Welcome to our judgment prediction system!</h1> */}
              <h1 className="head-div-second-text"> Welcome to our judgment prediction system!</h1>
              {/* <h1 className="head-div-third-text">
              Welcome to our judgment prediction system!
              </h1> */}
              <p className="head-div-fourth-text"> <span style={{ color: "#63c9c6" }}>Are you tired of the uncertainty and unpredictability of court cases?
               Do you want to know what the future holds for your legal matter? Look no further than our Final Judgment Prediction website!</span>
              
               </p>
                {/* Our platform helps you make informed decisions 
              by predicting the outcome of legal cases based on historical data. */}
             
            </section>
          </Fade>
        </div>
      </div>
      {/* <Fade bottom>
        <span className="scroll-btn">
          <a href="#home">
            <span className="mouse">
              <span></span>
            </span>
          </a>
        </span>
      </Fade> */}
      <div className="social-media">
        <Fade left cascade>
          <ul className="social-media-list">
            {SocialData.map((data, ind) => {
              return (
                <li key={data + ind}>
                  <a
                    className="social-media-list-link"
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={data.icon} className="media-icons" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Fade>
      </div>
    </div>
  );
};

export default Cover;

const SocialData = [
  {
    link: "https://github.com/Supipi622",
    icon: faGithub,
  },
  {
    link: "https://www.linkedin.com/in/supipinelumika/",
    icon: faLinkedin,
  },
  {
    link: "https://www.facebook.com/supipi.nelumika.3",
    icon: faFacebook,
  },
];
