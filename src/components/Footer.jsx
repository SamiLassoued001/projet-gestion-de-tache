import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './Footer.css'
import {Link } from 'react-router-dom'

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block' style={{textAlign:"center",marginLeft:"400px"}}>
          <h2  >Get started with TaskFlow today</h2>
          <div>
          <Link type="button" className="btn btn-primary" as={Link} to="/SignupForm">Sign up</Link>
          </div>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
             <Link to={"/"}><h3>TaskFlow 🌐📌</h3></Link> 
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>About us</h6>
              <p>
              TaskFlow 🌐📌 is a  task management platform with drag-and-drop, customizable workflows, and real-time updates for seamless team collaboration. 🚀

              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <Link to= "/AppPricing"className='text-reset'>
                  Pricing
                </Link>
              </p>
              <p>
                <Link to={"/Standars"} className='text-reset'>
                  Offres
                </Link>
              </p>
              <p>
                <Link to="/LoginForm" className='text-reset'>
                  Login
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                ksar Hellal, KH 5070, TU
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                TaskFlow@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 216 54 015 938
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 216 53 930 939
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
    
  );
}