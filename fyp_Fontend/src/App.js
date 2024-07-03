import React from 'react';
import Cover from './components/cover';
import NavbarComponent from "./components/navbar";
import About from './components/about';
import Quote from './components/quote';
import Services from './components/services';
import Contact from './components/contact';
import Prediction from './components/prediction';

const App = () => {
  React.useEffect(() => {
    
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

  }, [])
  return (
    <div className="app">
      <NavbarComponent />
      <Cover />
      <About />
      <Prediction/>
      <Quote />
     <Services />
      <Contact /> 
    </div>
  );
}

export default App;