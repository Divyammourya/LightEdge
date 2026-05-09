// import React from 'react';

// function Hero() {
//     return (  
//         <h1>hero</h1>
//     );
// }

// export default Hero;

import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
        style={{width:"75%", marginLeft:"13%", marginTop:"7%"}}
          src="media/myImages/homeHero(2).png"
          alt="Hero Image"
          className="mb-5"
        />
        <h2 className="mt-5">Invest in everything</h2>
        <p className="fs-5">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mt-4"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Hero;
