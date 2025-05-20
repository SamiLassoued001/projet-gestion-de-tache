import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Questionnaire.css'

//import Heroes from './Heroes';



function Questionnaire(){
    return(
      <>
      <section>
        <div className="container my-5" >
      <h2 className="text-center mb-4">F.A.Q</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What plan should I choose ?  </Accordion.Header>
          <Accordion.Body>
          One of the main points to consider is the size of your team (current and prospective) so check the user limit first. Next is the amount of functionality that you require – high-tier plans offer more advanced features and increased limits           </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What’s the difference between annual and monthly billing ?          </Accordion.Header>
          <Accordion.Body>
          The difference is how often you pay your subscription fee. The annual subscription has a 12-month billing cycle, which means that you pay a full subscription price every 12 months (please note that there are no installments available).          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>  Waht is the benefits of using website  for project management  ?</Accordion.Header>
          <Accordion.Body>
          ✅ 1. Easy-to-Use Interface<br/>
          📅 2. Task Management & Organization<br/>
          🔄 3. Collaboration & Teamwork<br/>


        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    </section>

    </>
  );
}

export default Questionnaire;
    