// import React from 'react';

// function RightSection() {
//     return (  
//         <h1>RightSection</h1>
//     );
// }

// export default RightSection;


import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1 class="nameParagraph" className="name">{productName}</h1>
          <p className="paragraph">{productDesription}</p>
          <div>
            <a href={learnMore}>Learn More</a>
          </div>
        </div>
        <div className="col-6">
          <img className="img" src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
