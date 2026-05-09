// import React from "react";
// import Hero from "./Hero";
// import Awards from "./Award";
// import Stats from "./Stats";
// import Pricing from "./Pricing";
// import Education from "./Education";

// import OpenAccount from "../OpenAccount";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// function HomePage() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Awards />
//       <Stats />
//       <Pricing />
//       <Education />
//       <OpenAccount />
//       <Footer />
//     </>
//   ); 
// }

// export default HomePage;


import React from 'react';
import Award from './Award';
import Education from './Education';
import Hero from './Hero';
import Pricing from './Pricing';
import Stats from './Stats';

import OpenAccount from '../OpenAccount';
import Navbar from '../Navbar';
import Footer from '../Footer';

function HomePage() {
    return ( 
        // <h1>Hi</h1>
        <>
        {/* <Navbar/> */}
        <Hero />
        <Award />
        <Stats />
        <Pricing />
        <Education />
        <OpenAccount/>
        {/* <Footer/> */}
        </>
     );
}

export default HomePage;
