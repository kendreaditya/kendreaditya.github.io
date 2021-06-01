import React from 'react';
import "semantic-ui-css/semantic.min.css";
import {Button, Popup} from 'semantic-ui-react';
import './About.css'

const About = ({profilepic, name, email, phone, resumeDownload, bio, skills}) => {
    return (
        <section id="about">
        <div className="row">
            <div className="three columns">
                <img className="profile-pic" src={profilepic} alt="Tim Baker Profile Pic" />
                <p style={{"margin": "0 0 0 0"}}>{name}</p>
                <p style={{"margin": "0 0 0 0"}}>{email}</p>
                <p style={{"margin": "0 0 0 0"}}>{phone}</p>
                <div className="download">
                    <p>
                        <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Resume</a>
                    </p>
                </div>
            </div>
            <div className="nine columns main-col">
                <h2>About Me</h2>
                <p>{bio}</p>
                <h2>Skills</h2>
                <div className="skills">
                    {skills.map((skill)=>(
                        <Popup trigger={
                            <button className="skill">{skill.name}</button>
                        }
                        position="top left">
                            {skill.description}
                        </Popup>
                    
                    ))}
                </div>
            </div>
        </div>
        </section>
    );
}

export default About;