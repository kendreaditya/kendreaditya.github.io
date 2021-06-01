import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume'
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer'

import './App.css'

import data from './resumeData.json'

// ADD ABILITY TO VIEW CODE

const App = () => {
    return(
        <>
            <Introduction
                name = {data.main.name}
                city = {data.main.address.city}
                occupation = {data.main.occupation}
                description = {data.main.description}
                social = {data.main.social}
            />
            <Portfolio projects={data.portfolio.projects}/>
            <About
                profilepic = {data.main.image}
                name = {data.main.name}
                email = {data.main.email}
                phone = {data.main.phone}
                resumeDownload = {data.main.resumedownload}
                bio = {data.main.bio}
                skills = {data.main.skills}
            />
            <Resume
                skillmessage = {data.resume.skillmessage}
                education = {data.resume.education.map(function(education){
                    return <div key={education.school}><h3>{education.school}</h3>
                    <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
                    <p>{education.description}</p></div>
                })}
                work = {data.resume.work.map(function(work){
                    return <div key={work.company}><h3>{work.company}</h3>
                        <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
                        <p>{work.description}</p>
                    </div>
                })}
                skills = {data.resume.skills.map(function(skills){
                    var className = 'bar-expand '+skills.name.toLowerCase();
                    return <li key={skills.name}><span style={{width:skills.level}}className={className}></span><em>{skills.name}</em></li>
                })}
            />
            <Contact
                name = {data.main.name}
                street = {data.main.address.street}
                city = {data.main.address.city}
                state = {data.main.address.state}
                zip = {data.main.address.zip}
                phone= {data.main.phone}
                email = {data.main.email}
                message = {data.main.contactmessage}
            />
            <Footer/>
        </>
    );
}

export default App;