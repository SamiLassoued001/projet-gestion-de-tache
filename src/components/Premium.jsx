import Standard from "./Standard";
import Header from "./Header";
import Questionnaire from "./Questionnaire";
import AppPricing from "./AppPricing";
function Premium () {
    return(
<>
<Header />
<section>
<Standard
        title1="Deploy faster"
        title2="Premium Taskflow"
        description="Achieve success in every project. Manage tasks with our signature TaskFlow boards—or use timelines, calendars, and more. Gain admin controls for just 250$ per month.."
        link="https://images.ctfassets.net/rz1oowkt5gyp/7kXrfJJ98tlBjnZHJXQZvn/87d841e05dd18456f5339373ae98f420/PremiumLP_HeroImage_2x.png?w=1140&fm=webp"
        />
</section>
<section><Questionnaire/></section>
<section><AppPricing/></section>
    
</>
    );
}

export default Premium;

{/*
  <section>
  <Standard
  title1="Deploy faster"
  title2="Standard Taskflow"
  description="Simplify teamwork with unlimited boards, powerful collaboration tools,
  and advanced automation—all for just 120$ per month."
  link="https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
  />
  <section/>
  
  */}