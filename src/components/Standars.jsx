import Header from "./Header"
import Standard from "./Standard"
import Features from "./Features"
import Questionnaire from "./Questionnaire"
import AppPricing from "./AppPricing"
function Standards(){
    return(
        <>
        <section><Header/></section>
        <section>
        <Standard
            title1="Deploy faster"
            title2="Standard Taskflow"
            description="Simplifiez le travail d'équipe avec des tableaux illimités, des outils de collaboration puissants et une automation avancée — le tout pour seulement 120 $ par mois."
            link="https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
            />
        </section>
        <section>
        <Features 
            title1={"Equipes"} 
            title2={"Entreprises"}
            title3={"#1"}
            description1={"Des équipes du monde entier utilisent Taskflow pour gérer efficacement leurs tâches et projets quotidiens."}
            description2='De nombreuses entreprises utilisent Taskflow pour rationaliser le travail entre les équipes et les départements.'
            description3='Taskflow se classe parmi les meilleurs en satisfaction client dans le rapport G2Grid® pour la gestion de projet.'
            link1="https://cdn-icons-png.flaticon.com/128/8318/8318527.png"
            link2="https://cdn-icons-png.flaticon.com/128/4091/4091542.png"
            link3="https://img.icons8.com/?size=48&id=rc7LK1GnKoSa&format=png"
        />
        </section>
        <section><Questionnaire/></section>
        <section><AppPricing/></section>

            
        </>

    )
}
export default Standards;