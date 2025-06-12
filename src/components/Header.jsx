// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import './Header.css'
// import {Link } from 'react-router-dom'

// import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

        
//         function Header() {
//           return (
//             <Navbar expand="lg" className="bg-body-tertiary">
//               <Container fluid>
//                 <Navbar.Brand as={Link} to="/"> TaskFlow</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                   <Nav
//                     className="me-auto my-2 my-lg-0"
//                     style={{ maxHeight: '100px' }}
//                     navbarScroll
//                   >
//                     <NavDropdown title="Fonctionnalité" id="navbarScrollingDropdown">
//                       <NavDropdown.Item as={Link} to="/Views">
//                         Views
//                       </NavDropdown.Item>
//                       <NavDropdown.Divider />
//                       <NavDropdown.Item as={Link} to="/Automation">
//                       Automation 
//                       </NavDropdown.Item>
//                       <NavDropdown.Divider />
//                       <NavDropdown.Item as={Link} to="/Planner">
//                       Planner
//                       </NavDropdown.Item>
//                     </NavDropdown>
//                     <NavDropdown
//           title="Solution"
//            id="navbarScrollingDropdown"
     
//     >
//       <NavDropdown.Item as={Link} to="/EquipementsMarketing" >
//         Equipements Marketing
//       </NavDropdown.Item>
//       <NavDropdown.Divider />
//       <NavDropdown.Item as={Link} to="/StartUps" >Start-Ups</NavDropdown.Item>
//       <NavDropdown.Divider />
//       <NavDropdown.Item as={Link} to="/GestiondeProduit">
//         Gestion de produit
//       </NavDropdown.Item>
      
//     </NavDropdown>



//                     <NavDropdown title="Offres" id="navbarScrollingDropdown">
//                       <NavDropdown.Item as={Link} to="/Standars">standard </NavDropdown.Item><NavDropdown.Divider />
//                        <NavDropdown.Item as={Link} to="/Premium">Premium </NavDropdown.Item>
                    

//                       <NavDropdown.Divider />
//                       <NavDropdown.Item as={Link} to="/Proffessional">
//                       Professional
//                       </NavDropdown.Item>
//                     </NavDropdown>
//                     <Nav.Link as={Link} to="/AppPricing">Tarifs</Nav.Link>

                
//                   </Nav>
//                   <Form className="d-flex">
//                   <Button variant="outline-success" as={Link} to="/Login">
//                  Login
//                     </Button>
//                     <Button variant="outline-success" as={Link} to="/Signup">Sign Up</Button>
//                   </Form>
//                 </Navbar.Collapse>
//               </Container>
//             </Navbar>
//           );
//         }
        
//         export default Header;
    
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Header.css';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="lg" bg="light" className="shadow-sm position-relative" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">TaskFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="z-3 bg-light p-3 p-lg-0">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavDropdown title="Fonctionnalité" id="nav-fonctionnalite">
              <NavDropdown.Item as={Link} to="/Views">Views</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Automation">Automation</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Planner">Planner</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Solution" id="nav-solution">
              <NavDropdown.Item as={Link} to="/EquipementsMarketing">Équipements Marketing</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/StartUps">Start-Ups</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/GestiondeProduit">Gestion de produit</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Offres" id="nav-offres">
              <NavDropdown.Item as={Link} to="/Standars">Standard</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Premium">Premium</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Proffessional">Professional</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/AppPricing">Tarifs</Nav.Link>
          </Nav>

          {/* LOGIN / SIGN UP - Alignés à droite */}
<Form
  className="d-flex flex-column flex-lg-row align-items-center gap-2 mt-3 mt-lg-0"
  style={{ minWidth: "200px" }}
>
  <Button
    variant="outline-primary"
    as={Link}
    to="/Login"
    className="px-4 py-2 rounded"
    style={{ borderRadius: "8px", minWidth: "100px" }}
  >
    Login
  </Button>

  <Button
    variant="primary"
    as={Link}
    to="/Signup"
    className="px-4 py-2 rounded"
    style={{ borderRadius: "8px", minWidth: "100px" }}
  >
    Sign Up
  </Button>
</Form>


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
