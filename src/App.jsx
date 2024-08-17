import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Comments/Home/Home';
import About from './Comments/About/About';
import Teams from './Comments/Teams/Teams';
import News from './Comments/News/News';
import Header from './Comments/Header/Header';
import Events from './Comments/Events/Events';
import Contact from './Comments/Contact/Contact';
import NewsDetail from './Comments/News/NewsDetail';
import Footer from './Comments/Footer/Footer';
import Gallery from './Comments/Gallery/Gallery';


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/news/:id" element={<NewsDetail />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/galleries" element={<Gallery />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
