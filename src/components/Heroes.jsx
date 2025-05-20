import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types"; 

function Heroes(props){
    return(
        <section style={{height:"700px"}}>
        
  
        <div className="b-example-divider" ></div>
  
        <div className="px-5 pt-5 my-5 text-center border-bottom">
          <h1 className="display-4 fw-bold text-body-emphasis">{props.title}</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">{props.description}</p>
          </div>
          <div className="overflow-hidden" >
            <div className="container px-5">
              <img
                src={props.link}
                alt="Example image"
                width="700"
                height="450"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    )
}
Heroes.propTypes = {
  title: PropTypes.string.isRequired,       // 'title' doit être une string et est requis
  description: PropTypes.string.isRequired, // 'description' doit être une string et est requis
  link: PropTypes.string.isRequired ,        // 'link' doit être une string et est requis
  
};
  
export default Heroes;
//"https://www.yoroflow.com/img/Templates/task-management-template/Template_Task_Management_main_image.png"
{/*
  <section>
  <Heroes
  title="TaskFlow powers team collaboration"
  description=" Where companies do their best work: easy to use, easy to manage, and full of powerful integrations and automations.."
  link="https://images.ctfassets.net/rz1oowkt5gyp/6QyHQvDLkY0cyFCSR5rKNO/a319830d6f23cfc890ddd7a3a935f7ee/Scale_trello_image.png?w=1140&fm=webp"
  />
  </section>
  */ }