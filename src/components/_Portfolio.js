import React, {useState} from 'react';
import Slider from "react-slick";
import './Porfolio.css'

const NextArrow = ({ onClick }) => {
  return (
    <div className="nextArrow" onClick={onClick}>
        <button>Next</button>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="prevArrow" onClick={onClick}>
        <button>Prev</button>
    </div>
  );
};

const Portfolio = ({ projects }) => {
    const [imageIndex, setImageIndex] = useState(0);
    
    
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        dots: false,
        speed: 300,
        slidesToShow: projects.length,
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
            <div className={isCurrentImage ? "activeSlide" : "slide"} key={idx}>
                <div className="slideWrapper">
                    <a href={isCurrentImage ? null : null}>
                        <img src={project.image} alt={idx}/>
                    </a>
                </div>
            </div>
        )
    });

    return (
        <Slider {...settings}>
            {slides}
        </Slider>
    );
}


export default Portfolio;