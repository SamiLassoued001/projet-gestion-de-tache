import { useState } from "react";
import PricingCard from "./PricingCard"
import "../styles/PricingApp.css";
import Footer from "./Footer";

function AppPricing() {
  const [selectMonthly,setSelectMonthly] = useState(true);
  console.log(selectMonthly);
  return (
    <>
    <section>
    <div className="PricingApp">
      <div className="app-container">
        {/* Header */}
        <header>
          <h1 className="header-topic">Our Pricing Plan</h1>
          <div className="header-row">
            <p>Annually</p>
            <label className="price-switch">
              <input
                className="price-checkbox"
                onChange={() => {
                  setSelectMonthly((prev) => !prev);
                }}
                type="checkbox"
              />
              <div className="switch-slider"></div>
            </label>
            <p>Monthly</p>
          </div>
        </header>
        {/* Cards here */}
        <div className="pricing-cards">
          <PricingCard
            title="Standard"
            price={selectMonthly ? "120$" : "99$"}
            storage="100 GB Storage"
            users="50"
            sendUp="1 700 exécutions de règles d'automatisation par mois"
          />
          <PricingCard
            title="Premium"
            price={selectMonthly ? "250$" : "200$"}
            storage="1024 GB Storage"
            users="100"
            sendUp="Limites d'automatisation par utilisateur (1 000 exécutions de règles par mois)"
          />
          <PricingCard
            title="Professional"
            price={selectMonthly ? "499$" : "399$"}
            storage="2 TB Storage"
            users="300"
            sendUp="Exécution illimitée de règles d'automatisation "

          />
        </div>
      </div>
    </div>
    </section>
    <section><Footer/></section>
    </>
  );
}

export default AppPricing;