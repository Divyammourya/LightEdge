import React from 'react';
import TradingAccount from './TradingAccount';
import InvestmentOptions from './InvestmentOptions';
import DematSteps from './DematSteps';
import DematBenefits from './DematBenefits';
import AccountTypes from './AccountTypes';
import faq from './faq';
import Footer from '../Footer';
import OpenAccount from '../OpenAccount';

document.body.innerHTML += faq;

// FAQ click functionality

// document.querySelectorAll(".faq-item").forEach(item => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("open");
//     });
// });

function SignupPage() {
    return ( 
        <>
        <TradingAccount />
        <InvestmentOptions />
        <DematSteps />
        <DematBenefits />
        {/* <faq /> */}
        <AccountTypes />
        <OpenAccount />
        </>
     );
}

export default SignupPage;