import React from 'react'

const AboutInfo = () => {
  return (
    <div className="about__info grid">
        <div className="about__box">
        <i className="bx bx-user-circle about__icon"></i>
            <h3 className="about__title">Full name</h3>
            <span className="about__subtitle">Pham Viet Hoang</span>
        </div>

        <div className="about__box">
        <i className="bx bxs-graduation about__icon" ></i>
            <h3 className="about__title">Education</h3>
            <span className="about__subtitle">FPT Polytechnic</span>
        </div>

        <div className="about__box">
        <i className="bx bx-map about__icon"></i>
            <h3 className="about__title">Location</h3>
            <span className="about__subtitle">Hanoi, Vietnam</span>
        </div>
    </div>
  )
}

export default AboutInfo