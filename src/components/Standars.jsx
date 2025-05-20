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
            description="Simplify teamwork with unlimited boards, powerful collaboration tools,
            and advanced automation—all for just 120$ per month."
            link="https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
            />
        </section>
        <section>
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
        </section>
        <section><Questionnaire/></section>
        <section><AppPricing/></section>

            
        </>

    )
}
export default Standards;