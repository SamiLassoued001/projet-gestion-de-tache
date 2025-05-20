import Header from './Header';
import Footer from './Footer';
import Heroes from './Heroes';
import HeroesLeftImg from './HeroesLeftImg';
import Standard from './Standard';
function Planner (){
return(
 <>
        <section><Header/></section>
        <section><HeroesLeftImg
  title1=""
  title2="Planifiez, restez concentré et faites-en plus"
  description="Le planificateur est votre compagnon idéal pour rester concentré et en faire plus."
  link="https://images.ctfassets.net/rz1oowkt5gyp/6agYIp4VLJgXJdlbuofjbs/41f35a2372327f35d3aaee3377250cd3/effortless-scheduling.png?w=1140&fm=webp"
  /></section>
        
<section>
  <Heroes
  title="Planifiez à tout moment et où que vous soyez"
  description=" Concentrez-vous et prenez le temps de traiter ce qui compte vraiment. Oubliez les calendriers disséminés et les dates limites non respectées ! Le planificateur  est votre outil de référence pour capturer et organiser vos plans, que vous soyez à votre bureau ou en déplacement."
  link="https://images.ctfassets.net/rz1oowkt5gyp/3EKhSNm6rGLbkmQbhL7d6l/9ae2600f804c8ae50c0fd4cb5c6b87dd/intuitive-organization.png?w=1140&fm=webp"
  />
  </section>
  <br />
  <br />

  <section>
 <Standard
  title1=""
  title2="Planification sans effort"
  description="Ne perdez pas le rythme ! Planifiez des tâches et des événements directement depuis vos outils préférés, comme Google Agenda et Outlook, afin de garder un œil sur tout."
  link="https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
  /></section>
  
  <section><Footer/></section>
 </>
)
}
export default Planner;