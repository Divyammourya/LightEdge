// import React from 'react';
// import Hero from './Hero';
// import Brokerage from './Brokerage';
// function PricingPage() {
//     return (  
//         // <h1>Pricing</h1>
//         <>
//         <Brokerage/>
//         <Hero/>
        
//         </>
//     );
// }

// export default PricingPage;


import React from "react";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";

function PricingPage() {
  return (
    <>
      <Hero />
      <Brokerage />
      <OpenAccount/>
    </>
  );
}

export default PricingPage;
