import React, { useState } from "react";
import Slider from "react-slick";
import './Portfolio.css'

const NextArrow = ({ onClick }) => {
  return (
    <i className="fa fa-chevron-right" onClick={onClick}/>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <i className="fa fa-chevron-left" onClick={onClick}/>
  );
};

const Porfolio = ({projects}) => {
    const [imageIndex, setImageIndex] = useState(0);

    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      dots: false,
      speed: 300,
      slidesToShow: 3,
      centerPadding: "0",
      swipeToSlide: true,
      focusOnSelect: true,
      nextArrow: <NextArrow onClick />,
      prevArrow: <PrevArrow onClick />,
      beforeChange: (current, next) => setImageIndex(next),
      responsive: [
        {
          breakpoint: 1490,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    let slides = projects.map((project, idx) => {
        let isCurrentImage = idx === imageIndex;
        return (
            <div className={isCurrentImage ? "active-slide" : "slide"} key={idx}>
                <div className="slide-wrapper">
                    <a href={isCurrentImage ? null : null}>
                        <img src={project.image} alt={idx}/>
                    </a>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-discription">{project.discription}</p>
                </div>
            </div>
        )
    });

    return <Slider {...settings}>{slides}</Slider>;
};

export default Porfolio;
