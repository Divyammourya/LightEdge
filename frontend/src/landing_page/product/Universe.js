// import React from 'react';

// function Universe() {
//     return (
//         <h1>Universe</h1>
//      );
// }

// export default Universe;

import React from "react";

function Universe() {
  return (
    <div className="container pb-5 mt-5">
      <div className="row text-center">
        <h1 className="fs-4 mb-4">The LightEdge Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img style={{width:"45%"}} src="media/myImages/lightspeedFundhouse(3).png" />
          <p className="text-small text-muted m-3">
            Our asset management venture<br/> that is creating simple and transparent
            index<br/> funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"55%"}} src="media/images/sensibull-logo.svg" />
          <p className="text-small text-muted m-4">
            Options trading platform that lets you<br/> create strategies, analyze
            positions, and examine<br/> data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img className="mb-1" style={{width:"40%"}} src="media/images/tijori.svg" />
          <p className="text-small text-muted">
            Investment research platform<br/> that offers detailed insights on
            stocks,<br/> sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"40%"}} src="media/images/streak-logo.png" />
          <p className="text-small text-muted m-3">
            Systematic trading platform<br/> that allows you to create and backtest<br/>
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"50%"}} src="media/images/smallcaseLogo.png" />
          <p className="text-small text-muted m-3">
            Thematic investing platform <br/>that helps you invest in diversified<br/>
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"35%"}} src="media/images/ditto-logo.png" />
          <p className="text-small text-muted m-3">
            Personalized advice on life<br/> and health insurance. No spam <br/>and no
            mis-selling.
          </p>
        </div>
        {/* <button
          className="p-2 btn btn-primary fs-5 mt-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up for free
        </button> */}
      </div>
    </div>
  );
}

export default Universe;
