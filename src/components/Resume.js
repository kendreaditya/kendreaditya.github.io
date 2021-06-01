import React from 'react';

const Resume = ({education, work}) => {
    return (
    <section id="resume">
        <div className="row education">
            <div className="three columns header-col">
                <h1><span>Education</span></h1>
            </div>
            <div className="nine columns main-col">
                <div className="row item">
                <div className="twelve columns">
                    {education}
                </div>
                </div>
            </div>
        </div>
        <div className="row work">

            <div className="three columns header-col">
                <h1><span>Work</span></h1>
            </div>

            <div className="nine columns main-col">
            {work}
            </div>
        </div>
    </section>
    );
}

export default Resume;