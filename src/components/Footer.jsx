import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div
          className="me-5 d-none d-lg-block"
          style={{  }}
        >
          <h2 style={{textAlign: "center",paddingLeft: "150px"}}>Commencez avec TaskFlow dès aujourd'hui</h2>
          <div style={{ paddingLeft: "650px"}}>
            <Link 
              type="button"
              className="btn btn-primary"
              as={Link}
              to="/Signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Nom de l'entreprise
              </h6>
              <Link to={"/"}>
                <h3>TaskFlow 🌐📌</h3>
              </Link>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">À propos de nous</h6>
              <p>
                TaskFlow 🌐📌 est une plateforme de gestion de tâches avec des
                workflows personnalisables par glisser-déposer et des mises à
                jour en temps réel pour une collaboration d'équipe sans faille.
                . 🚀
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liens utiles</h6>
              <p>
                <Link to="/AppPricing" className="text-reset">
                  Prix
                </Link>
              </p>
              <p>
                <Link to={"/Standars"} className="text-reset">
                  Offres
                </Link>
              </p>
              <p>
                <Link to="/Login" className="text-reset">
                  Login
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
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
