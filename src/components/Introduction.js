import React, { useState, useEffect } from 'react';
import './Introduction.css'
import Particles from 'react-particles-js';
import particles from './assets/particles.json';

const Introduction = ({name, city, occupation, description, social}) => {
   let networks = social.map((network) => 
      <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
   )

   const [windowHeight, setWindowHeight] = useState(window.innerHeight)

   useEffect(() => {
      function handleResize() {
         setWindowHeight(window.innerHeight)
      }
      window.addEventListener('resize', handleResize)
   })

   return (
      <header id="home" style={{'height': windowHeight}}>
            <div className="particlesContainer" style={{zIndex:-1}}>
               <Particles params={{particles}} style={{
						position: 'absolute',
						left: 0,
						top: 0,
					}}
					width="100%"
					height="100%" />
            </div>
            <nav id="nav-wrap">

               <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
               <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

               <ul id="nav" className="nav">
                  <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
                  <li><a className="smoothscroll" href="#about">Portfolio</a></li>
                  <li><a className="smoothscroll" href="#about">About</a></li>
                  <li><a className="smoothscroll" href="#resume">Resume</a></li>
                  <li><a className="smoothscroll" href="#contact">Contact</a></li>
               </ul>

            </nav>


            <div className="row banner">
               <div className="banner-text">
                  <h1 className="responsive-headline">I'm {name}.</h1>
                  <h3>I'm a {city} based <span>{occupation}</span>. {description}.</h3>
                  <hr />
               </div>
               <ul className="social" style={{textAlign: 'center'}}>
                  {networks}
               </ul>
            </div>


            <p className="scrolldown">
               <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
            </p>
      </header>
    );
   }
   
   export default Introduction;