import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import PropTypes from "prop-types"; 
import {Link } from 'react-router-dom'






export default function HeroesLeftImg(props) {
  return (
<>

<section>
<div className="container py-5">
      <div className="row align-items-center">
      <div className="col-lg-6">
          <img style={{height:"400px", width: "1400px",marginTop:"30px"}}
            src={props.link}
            alt="Product screenshot"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-lg-6" style={{ height:"400px", marginTop: "-20%"   }}>

          <h2 className="text-primary" style={{marginLeft:"1px"}}>{props.title1}</h2>
          <p className="h1 fw-bold" style={{marginTop:"10px"}}>{props.title2}</p>
          <p className="text-muted" style={{ fontSize: "x-large"}}>
          {props.description}
          </p>
          <div className="d-flex" >
            <Button variant="primary" style={{marginLeft:"1px"}} as={Link} to={"/SignupForm"}> Démarrer</Button>
          </div>
          

        </div>
       
      </div>
    </div>
    </section>
   

 </>  

  );
}
HeroesLeftImg.propTypes = {
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