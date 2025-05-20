import Header from "./Header"
import Footer from "./Footer";
import Standard from "./Standard";
import Carroussel from "./Carroussel";
import Featuresli from "./Featuresli";
function Automation(){
    return(
        <>
          <section><Header/></section>
          <section>
          <Standard
            title2="Automate your workflow"
            description="Streamline your processes with intelligent automation and workflows.
Boost efficiency and productivity by automating repetitive tasks seamlessly.🚀"
            link="https://images.ctfassets.net/rz1oowkt5gyp/5VdMUyyLbdnF4kqGM5aORJ/646505ec4e9d9f91b9dc2b88198d5866/butler-header.svg" 
            />
            </section>
         <section><Carroussel/></section>   
         <section><Featuresli
    title1={"Boost Your Productivity with Automation"} 
    title2={" Control"}
    title3={"Keep progressing with your work"}
    description1={"Set up rules to streamline your workflow and ensure tasks are completed efficiently.  Use custom buttons on cards and boards to trigger multiple actions instantly.  Automate commands to save time and boost productivity effortlessly."}
    description2="By setting up rules, you ensure that important tasks won’t be overlooked. Define a trigger and actions to perform, then let automation handle the rest.Move faster with custom card and board buttons. Card buttons appear on the back of each card, while board buttons are in the top right corner. Both execute multiple actions with a single click!" 
    description3='moves the card to the “Done” list and indicates the end date and move the card to the “In Progress” list and adds you to the card with a deadline.'
    link1="https://cdn-icons-png.flaticon.com/128/10492/10492513.png"
    link2="https://img.icons8.com/?size=80&id=esde8NJ0Pqjd&format=png"
    link3=".\src\assets\téléchargement.png"
    li1="slm"
    />
    </section>
         
       
        
          <section><Footer/></section>

        </>
    )
}
export default Automation;


