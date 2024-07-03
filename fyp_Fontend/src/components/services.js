import React from "react";
import CardComponent from "./card-component";
import Pro1 from "../assets/img/project-1.jpg";
import Pro2 from "../assets/img/project-2.png";
import { Fade } from "react-reveal";

const Services = () => {
  return (
    <div
      style={{ background: "#0b0b0d", color: "white" }}
      className="main-div"
      id="project"
    >
      <Fade left cascade>
        <section className="div-1">
          <h1 className="heading">Our services..</h1>
          <div>
            {ProjectData.map((data, ind) => {
              const {  img, title, text, explanation } = data;
              return (
                <CardComponent
                  key={data + ind}
                  img={img}
                  title={title}
                  text={text}
                  explanation={explanation}
                />
              );
            })}
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default Services;

const ProjectData = [
  {
    title: "Prediction System",
    img: Pro1,
    explanation: "You can use to Sinhala or English language",
    text: "Submit your problem to us and get a guidance .",
    
  },
  {
    title: " imfrometion file downloder ",
    img: Pro2,
    explanation: "PDF ,.text ,.doc",
    text:  "IF you want to download Any Acts file download you can download this website ..",
   
  },

];