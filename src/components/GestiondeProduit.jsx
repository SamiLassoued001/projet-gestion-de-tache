import Header from "./Header"
import Heroes from './Heroes';
import Standard from './Standard'; 

import AppPricing from "./AppPricing";

import HeroesLeftImg from "./HeroesLeftImg"
function GestiondeProduit(){

 
    return(
        <>
        <section><Header/></section>
        <section>
            <Heroes
            title="TaskFlow Pour les équipes de gestion de produits"
            description=" Mettez sur le marché des produits de haute qualité plus rapidement. Découvrez les moyens les plus efficaces par lesquels les équipes de gestion de produits peuvent suivre les feuilles de route des produits, simplifier les sprints et lancer de nouvelles mises à jour en toute simplicité."
            link="https://images.ctfassets.net/rz1oowkt5gyp/36PnpdmXvcwbAeIrYlONqB/41927205eb9a3cdcfb08320bc95dd806/Card4_2x.png?w=704&fm=webp"
            />
        </section>
        <section>
        <Standard
            title2="Ouvrez la voie à des lancements de produits plus fluides."
            description="Donnez à votre équipe de gestion de produits les moyens de faire avancer les projets plus rapidement et plus facilement grâce à la vue chronologique."
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
export default GestiondeProduit;