import PropTypes from "prop-types"; 
import Dropdowns from "./DropDowns";

function  Features (props)  {
  return (
    <div className="container px-4 py-5" id="featured-3">
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center  bg-gradient fs-2 mb-3">
          <img src={props.link1} alt="Icon 1" width="50" height="50" />
        </div>
        <h3 className="fs-2 text-body-emphasis" >{props.title1}</h3>
        <p>
          {props.description1}
        </p>
       
        
      </div>
      <div className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center  bg-gradient fs-2 mb-3">
          <img src={props.link2} alt="Icon 2" width="50" height="50" />
        </div>
        <h3 className="fs-2 text-body-emphasis">{props.title2}</h3>
        <p>
        {props.description2}

        </p>
        <Dropdowns 
       title="How to try"
       li1="- Automatically Add a Checklist."
       li2="- When a card is created in the To Do list, add a Steps checklist to ensure nothing is missed Set Due Dates from Card Names."
       li3="-  If a card name ends with a date, set that date as the due date, making it easy to schedule tasks, especially when emailing cards to the board."
       />
       
        
      </div>
      <div className="feature col">
        <div className="feature-icon d-inline-flex align-items-center justify-content-center  bg-gradient fs-2 mb-3">
          <img src={props.link3} alt="Icon 3" width="50" height="50" />
        </div>
        <h3 className="fs-2 text-body-emphasis">{props.title3}</h3>
        <p>
          {props.description3}
        </p>
      
      </div>
    </div>
  </div>
);
};
Features.propTypes = {
  title1: PropTypes.string.isRequired,       // 'title' doit être une string et est requis
  title2: PropTypes.string.isRequired,
  title3: PropTypes.string.isRequired,
  description1: PropTypes.string.isRequired, // 'description' doit être une string et est requis
  description2: PropTypes.string.isRequired,
  description3: PropTypes.string.isRequired,
  link1: PropTypes.string.isRequired ,        // 'link' doit être une string et est requis
  link2: PropTypes.string.isRequired ,
  link3: PropTypes.string.isRequired ,
  li1: PropTypes.string.isRequired ,
  li2: PropTypes.string.isRequired ,
  li3: PropTypes.string.isRequired 

};
  
export default Features;
{/* 
<Features 
    title1={"Teams"} 
    title2={"Companies"}
    title3={"#1"}
    description1={"Teams around the world use Taskflow to manage their daily tasks and projects efficiently."}
    description2='Many  companies use Taskflow to streamline work across teams and departments.'
    description3='Taskflow ranks highly in Customer Satisfaction on the G2Grid® Report for Project Management.'
    link1="https://cdn-icons-png.flaticon.com/128/8318/8318527.png"
    link2="https://cdn-icons-png.flaticon.com/128/4091/4091542.png"
    link3="https://img.icons8.com/?size=48&id=rc7LK1GnKoSa&format=png"
    />
    */}