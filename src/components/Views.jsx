import Header from './Header';
import Footer from './Footer';
import Heroes from './Heroes';
import HeroesLeftImg from './HeroesLeftImg';
import Standard from './Standard';
function Views (){
return(
 <>
        <section><Header/></section>

        <section><HeroesLeftImg
  title1=""
  title2="Donnez un nouveau look au travail avec les vues"
  description="Visualisez vos projets sous tous les angles avec les vues :
Tableau, Chronologie, Tableau, Calendrier, Tableau de bord,
Carte et Espace de travail qui apporteront une nouvelle perspective à la tâche à accomplir
Les tableaux sont accessibles à tous les utilisateurs.
Les vues supplémentaires nécessitent un compte Premium ou Enterprise."
  link="https://reisdigital.es/wp-content/uploads/2022/10/la-importancia-del-analisis-de-compra-en-el-marketing-digital.png"
  /></section>
        
<section>
  <Heroes
  title="Analyse et Suivi des Tâches 📊"
  description=" Grâce aux vues dynamiques, vous pouvez afficher vos tâches sous forme de tableau Kanban, calendrier, ou liste détaillée. Suivez l'avancement de vos projets en temps réel.

"
  link="https://wp.2sync.com/wp-content/uploads/2023/11/trello-kanban-1024x687.png"
  />
  </section>
  <br />
  <br />

  <section>
 <Standard
  title1=""
  title2="Gérer le travail sur plusieurs table"
  description="Créez autant d'aperçus personnalisés que nécessaire sur les tableaux Workspace.
Utilisez les vues Tableau de l'espace de travail et Calendrier pour suivre les détails mineurs ou les grands projets."


  link="https://www.sysnove.fr/images/blog/trello-board.png"
  /></section>
  
  <section><Footer/></section>
 </>
)
}
export default Views;