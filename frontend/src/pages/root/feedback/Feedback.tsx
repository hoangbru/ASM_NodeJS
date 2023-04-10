import React from "react";
import "./feedback.css";
import imgFeedback1 from "../../../assets/images/feedback1.jpg";
import imgFeedback2 from "../../../assets/images/feedback2.jpg";
import imgFeedback3 from "../../../assets/images/feedback3.jpg";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Feedback = () => {
  var settings = {
    arrows: false,
    dots: true,
    speed: 700,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="feedback section" id="feedback">
      <h2 className="section__title">Feedback</h2>

      <Slider {...settings} className="feedback__container container grid">
        <div className="feedback__card">
          <img src={imgFeedback1} alt="" className="feedback__img" />
          <div className="feedback__content">
            <h3 className="feedback__name">Tran Thi Phuong</h3>
            <p className="feedback__description">Hay qua anh zai ui !</p>
          </div>
        </div>
        <div className="feedback__card">
          <img src={imgFeedback2} alt="" className="feedback__img" />

          <div className="feedback__content">
            <h3 className="feedback__name">Ngo Van Vu</h3>
            <p className="feedback__description">Tuyet voi luon !</p>
          </div>
        </div>
        <div className="feedback__card">
          <img src={imgFeedback3} alt="" className="feedback__img" />
          <div className="feedback__content">
            <h3 className="feedback__name">Vu Bao Linh</h3>
            <p className="feedback__description">Hay !!</p>
          </div>
        </div>

        
      </Slider>
    </section>
  );
};

export default Feedback;
