// import React from 'react';

// function Hero() {
//     return (  
//         <h1>Hero</h1>
//     );
// }

// export default Hero ;


import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center p-4">
        <h1 className="mt-5 pt-5">Technology</h1>
        <h3 className="text-muted mt-3 fs-4">
          Sleek, modern and intuitive trading platforms
        </h3>
        <p className="mt-3 mb-5">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none" }}>
            investment offerings{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
