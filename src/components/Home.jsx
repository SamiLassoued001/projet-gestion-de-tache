import Header from "./Header"
import Heroes from './Heroes';
import Standard from './Standard'; 
import Features from "./Features"
import AppPricing from "./AppPricing";

// import { useState } from "react";
// import { useEffect } from "react";
function Home(){
//     const [zid,setZid]=useState(false);
// useEffect(()=>{ 
//     zid  && alert("yaatik saha")
// },[zid])
 
    return(
        <>
        <section><Header/></section>
        <section>
        <Standard
            title2="TasFlow brings all your tasks, teammates, and tools together"
            description="Keep everything in the same place—even if your team isn’t."
            link="https://images.ctfassets.net/rz1oowkt5gyp/4b1jDnPzaFAEtoHvqly4aV/7803ac8a2539d79b48bc6f9d6a103296/StandardLP_HeroImage_2x.png?w=1140&fm=webp"
            />
        </section>
        <section>
            <Heroes
            title="TaskFlow powers team collaboration"
            description=" View your team’s projects from every angle and bring a fresh perspective to the task at hand."
            link="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp"
            />
        </section>
        <section>
                <Features 
                    title1={"Project Management"} 
                    title2={"Task Management"}
                    title3={"Brainstorming"}
                    description1={"Keep tasks in order,deadlines on track,and team members aligned with TaskFlow. "}
                    description2='Use TaskFlow to create and assign tasks, set deadlines, and track progress.'
                    description3='Use TaskFlow to create a collaborative space for brainstorming and idea generation.'
                    link1="https://cdn-icons-png.flaticon.com/128/9646/9646458.png"
                    link2="https://cdn-icons-png.flaticon.com/128/8594/8594243.png"
                    link3="https://cdn-icons-png.flaticon.com/128/7287/7287819.png"
                />
                </section>
                <section><AppPricing/></section>
       
        </>
        // props
        // component
        // useState 
        // useEffect  
        // type de retour de state boolean string number 
        // style condition backgroundColor: zid? "red":"yellow",
        // <div
        // style={{flex:1,justifyContent:"center",backgroundColor: zid? "red":"yellow",alignItems:"center", height:"100svh", padding:"25%" }}
        // >
            
        // <Test content={"jshfjdfj dfhdj fdfj"}/>
        // <Test content={"aaaaa aaa"}/>

        // <p>{zid? "gg" : "ff"}</p>
        // <button 
        // onClick={
        //     ()=>
                
        //         {
        //             setZid(!zid)
                    
        //           }
        //           }  >3aks</button>
     
      
        //     </div>
    )
}
export default Home;