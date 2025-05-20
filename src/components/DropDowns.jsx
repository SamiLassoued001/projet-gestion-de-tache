import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import PropTypes from "prop-types"; 

export default function Dropdowns(props) {
  return (
    <MDBDropdown>
      <MDBDropdownToggle tag='a' style={{cursor:"pointer"}} >
        {props.title}
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem li>{props.li1}</MDBDropdownItem>
        <br />
        <MDBDropdownItem li>{props.li2}</MDBDropdownItem>
        <br />
        <MDBDropdownItem li>{props.li3}</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}
Dropdowns.propTypes = {
  title: PropTypes.string.isRequired,       // 'title' doit être une string et est requis
  li1: PropTypes.string.isRequired ,        // 'link' doit être une string et est requis
  li2: PropTypes.string.isRequired ,
  li3: PropTypes.string.isRequired 
};
{/* 
  <section>
  <DropDowns
  title="How to try"
  li1="Automatically Add a Checklist."
  li2="When a card is created in the To Do list, add a Steps checklist to ensure nothing is missed Set Due Dates from Card Names."
  li3=" If a card name ends with a date, set that date as the due date, making it easy to schedule tasks, especially when emailing cards to the board."
  />
  <section/>
  */}