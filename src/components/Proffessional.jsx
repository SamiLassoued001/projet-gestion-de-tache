import { Button } from "react-bootstrap";
import PropTypes from "prop-types"; 
import Header from "./Header";
import Footer from "./Footer";
import Heroes from "./Heroes";
import Questionnaire from "./Questionnaire";

function Proffessional(props){
    return(
        <>
        <section><Header/></section>
        <section>
<div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6" style={{    height: "400px"}}>
          <p className="h1 fw-bold" style={{marginBottom:"40px",marginTop:"100px"}}>{props.plans}</p>
          <p className="text-muted" style={{ fontSize: "x-large"}}>
            {props.description}
          </p>
          <div className="d-flex" >
            <Button variant="primary" style={{marginLeft:"1px"}}> Sign Up</Button>
          </div>
          

        </div>
        <div className="col-lg-6">
          <img style={{height:"400px"}}
            src={props.link}
            alt="Product screenshot"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
    </section>
    <section>
  <Heroes
  title="TaskFlow renforce la collaboration en équipe"
  description="Là où les entreprises font leur meilleur travail : facile à utiliser, facile à gérer et plein d'intégrations et d'automatisations puissantes. "
  link="https://images.ctfassets.net/rz1oowkt5gyp/6QyHQvDLkY0cyFCSR5rKNO/a319830d6f23cfc890ddd7a3a935f7ee/Scale_trello_image.png?w=1140&fm=webp"
  />
  </section>
    <section><Questionnaire/></section>
   
    <section><Footer/></section>
   </>
    )
}
Proffessional.propTypes = {
  title: PropTypes.string.isRequired,       // 'title' doit être une string et est requis
 plans: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, // 'description' doit être une string et est requis
  link: PropTypes.string.isRequired       // 'link' doit être une string et est requis
}
export default Proffessional;
{/*
<section>
< Proffessional 
 title={"Deploy Faster"} 
 plans={"TaskFlow Proffessional"} 
 description={"Tasks, deadlines, and projects—stay on top of it all with the ultimate project management tool. Streamline your workflow, enhance collaboration, and boost productivity effortlessly. Keep everything organized and achieve your goals with ease!" }
 link="https://www.bitrix24.com/upload/optimizer/converted/images/content_en/tools/tasks_and_projects/index/tasks_and_projects-img-block-1.1366w.jpg.webp?1738949454146"
 />
 </section>
*/}


