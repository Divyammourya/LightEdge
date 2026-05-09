// import React from 'react';

// function Team() {
//     return (
//         <h1>Team</h1>
//      );
// }

// export default Team;

import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
                        {/* <div style={{padding:"1px", backgroundColor:"rgb(0,0,67)"}}></div> */}

        <h1 className="text-center mt-3 pt-5">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/myImages/img.jpg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Divyam Mourya</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Divyam bootstrapped and founded LightEdge in 2023 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            LightEdge has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>

        <div className="row mt-5 p-5 text-center">
          <div className="col">
            <img
              src="media/myImages/img2.jpg"
              style={{ borderRadius: "100%", width: "50%" }}
            />
            <h4 className="mt-5">Deepak</h4>
            <h6>Co-Founder & CFO</h6>
          </div>
          <div className="col">
            <img
              src="media/myImages/img2.jpg"
              style={{ borderRadius: "100%", width: "50%" }}
            />
            <h4 className="mt-5">Diksha</h4>
            <h6>CTO</h6>
          </div>
          <div className="col">
            <img
              src="media/myImages/img2.jpg"
              style={{ borderRadius: "100%", width: "50%" }}
            />
            <h4 className="mt-5">Divyanshu</h4>
            <h6>CCO</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
