import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css'


const About = () => {
  return (
    <div className="container">
      <div className='about-wrapper'>
        <h1 className="mb-4">About</h1>
        <p className="mb-5 fw-bold text-dark">
          LitterLotto is a web application designed to incentivize people to clean up their communities by 
          turning litter collection into a interactive and rewarding challenge. Users can capture images of their 
          litter-picking activities and share their progress. 
          This initiative aims to foster a global community committed to environmental stewardship and 
          sustainability.
        </p>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">EEA Analysis and Data</h5>
                <p className="card-text">Find out more about the EEA Analysis and Data.</p>
                <a href="https://www.eea.europa.eu/en/analysis" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Waste Management UK</h5>
                <p className="card-text">Explore the Impact of Tourism Waste in the UK.</p>
                <a href="https://www.wastemanaged.co.uk/tourism-waste-uk/" target="_blank" rel="noopener noreferrer"  className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Community Initiatives</h5>
                <p className="card-text">You can help your community group organise a cleanup of your local area.</p>
                <a href="https://www.belfastcity.gov.uk/captaincleanup" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
