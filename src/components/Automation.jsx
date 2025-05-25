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
            title2="Automatisez votre flux de travail"
            description="Rationalisez vos processus avec une automation intelligente et des flux de travail. Augmentez l'efficacité et la productivité en automatisant sans effort des tâches répétitives.🚀"
            link="https://images.ctfassets.net/rz1oowkt5gyp/5VdMUyyLbdnF4kqGM5aORJ/646505ec4e9d9f91b9dc2b88198d5866/butler-header.svg" 
            />
            </section>
         <section><Carroussel/></section>   
         <section><Featuresli
    title1={"Améliorez votre productivité grâce à l'automatisation."} 
    title2={" Controle"}
    title3={"Continuez à progresser dans votre travail."}
    description1={" Mettez en place des règles pour simplifier votre flux de travail et garantir que les tâches sont réalisées efficacement. Utilisez des boutons personnalisés sur des cartes et des tableaux pour déclencher plusieurs actions instantanément. Automatisez les commandes pour gagner du temps et améliorer votre productivité sans effort."}
    description2="Contrôlez en établissant des règles pour garantir que les tâches importantes ne seront pas négligées. Définissez un déclencheur et des actions à réaliser, puis laissez l'automatisation s'occuper du reste. Allez plus vite avec des boutons personnalisés pour les cartes et les tableaux. Les boutons des cartes apparaissent au dos de chaque carte, tandis que les boutons des tableaux se trouvent dans le coin supérieur droit. Les deux exécutent plusieurs actions d'un simple clic !" 
    description3=" Contrôlez en établissant des règles pour garantir que les tâches importantes ne seront pas négligées. Définissez un déclencheur et des actions à réaliser, puis laissez l'automatisation s'occuper du reste. Allez plus vite avec des boutons personnalisés pour les cartes et les tableaux. Les boutons des cartes apparaissent au dos de chaque carte, tandis que les boutons des tableaux se trouvent dans le coin supérieur droit. Les deux exécutent plusieurs actions d'un simple clic !"
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


