import Header from "./Header"
import Heroes from './Heroes';
import Standard from './Standard'; 

import AppPricing from "./AppPricing";

import HeroesLeftImg from "./HeroesLeftImg"
function StartUps(){

 
    return(
        <>
        <section><Header/></section>
        <section>
            <Heroes
            title="TaskFlow Pour les startups"
            description=" De l'embauche de votre premier employé à l'atteinte de vos objectifs de revenus, découvrez comment prospérer en tant que startup"
            link="https://images.ctfassets.net/rz1oowkt5gyp/36PnpdmXvcwbAeIrYlONqB/41927205eb9a3cdcfb08320bc95dd806/Card4_2x.png?w=704&fm=webp"
            />
        </section>
        <section>
        <Standard
            title2="Obtenez des informations exploitables et des mesures clés."
            description="Aidez votre échelle de démarrage (sans les douleurs de croissance) en prenant des décisions éclairées basées sur les données à l'aide de la vue Tableau de bord. Tirez le meilleur parti des différentes vues"
            link="https://images.ctfassets.net/rz1oowkt5gyp/68zIvQpZurj8bcZbd6gshI/5864c4ed8e1f8ca9fb144eaf9b775d47/Calendar_View_Illo_7.png?w=1280&fm=webp"
            />
        


        </section>
 


        <section><HeroesLeftImg
          title1=""
          title2="Boostez vos lancements"
          description="Passez plus de temps à lancer des produits et moins de temps à faire des tâches administratives lourdes. Avec les Power-Ups, vous pouvez connecter vos outils numériques préférés comme Google Drive et Slack , et des fonctionnalités comme le calendrier permettent à vos équipes d’avoir une vue d’ensemble des feuilles de route des produits."
          
          link="https://images.ctfassets.net/rz1oowkt5gyp/5YEBb9savBpFjYs3f73V9k/b780c8264ea47498e8e3c370d8c42499/Power-Ups.svg"
          /></section>

        <section>
            <Heroes
            title="Faites avancer le travail, automatiquement comme par magie"
            description=" L’automatisation intégrée facilite l’automatisation des tâches quotidiennes répétitives qui empêchent votre équipe de se concentrer sur le travail le plus important."
            link="https://images.ctfassets.net/rz1oowkt5gyp/5VdMUyyLbdnF4kqGM5aORJ/646505ec4e9d9f91b9dc2b88198d5866/butler-header.svg"
            />
        </section>
        
                <section><AppPricing/></section>
       
        </>
        
    )
}
export default StartUps;