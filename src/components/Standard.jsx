import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import PropTypes from "prop-types"; 
import {Link } from 'react-router-dom'






export default function Standard(props) {
  return (
<>

<section>
<div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6" style={{    height: "400px"}}>
          <p className="h1 fw-bold" style={{marginBottom:"40px",marginTop:"100px"}}>{props.title2}</p>
          <p className="text-muted" style={{ fontSize: "x-large",marginBottom:"20px"}}>
          {props.description}
          </p>
          <div className="d-flex" >
            <Button variant="primary" as={Link} to={"/Signup"}style={{marginLeft:"1px"}}> Sign Up</Button>
          </div>
          

        </div>
        <div className="col-lg-6">
          <img style={{height:"400px", width: "1200px",objectFit: "cover",marginTop:"30px"}}
            src={props.link}
            alt="Product screenshot"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
    </section>
   

 </>  

  );
}
Standard.propTypes = {
  title1: PropTypes.string.isRequired,       // 'title' doit être une string et est requis
  title2: PropTypes.string.isRequired,
 plans: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, // 'description' doit être une string et est requis
  link: PropTypes.string.isRequired       // 'link' doit être une string et est requis
}
//
//

//"https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
{/*
  <section>
  <Standard
  title1="Deploy faster"
  title2="Standard Taskflow"
  description="Simplify teamwork with unlimited boards, powerful collaboration tools,
  and advanced automation—all for just 120$ per month."
  link="https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
  />
  <section/>
  
  */}