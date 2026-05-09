// import React from 'react';

// function Footer() {
//     return (
//         <h1>Footer</h1>
//      );
// }

// export default Footer;

import React from "react";
import './index.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="containerFooter border-top mt-5">
        <div className="row mt-5 mx-5">
          <div className="col">
            <Link class="navbar-brand" to="/">
            <img src="media/myImages/logo4.PNG" style={{ width: "80%" }} />
            <img src="media/myImages/logo4(2).PNG" style={{ width: "15%" }} />
            </Link>
            <p style={{ fontSize: "75%" }}><br/>
              &copy; 2010 - 2024, Not Zerodha Broking Ltd.
              <br /> All rights reserved.
            </p>
          </div>
          <div className="col">
            <p className="fs-5">Account</p>
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Open demate account
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Minor demate account
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              NRI demate account
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Commodity
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Dematerialisation
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Fund transfer
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              MTF
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Refferal program
            </a>
            <br />
          </div>
          <div className="col">
            <p className="fs-5">Support</p>
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Contact
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Support portal
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              How to file a complaint
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Status of your complaint
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Bulletin
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Circular
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              L-Connect blog
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Downloads
            </a>
            <br />
          </div>
          <div className="col">
            <p className="fs-5">Company</p>
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              About
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Philosophy
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Press & media
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Careers
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              LightEdge Cares (LSR)
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              LightEdge.tech
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Open source
            </a>
            <br />
          </div>
          <div className="col">
            <p className="fs-5">Quick links</p>
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Upcoming IPOst
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Brokerage charges
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Brokerage charges
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Economic calendar
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Calculators
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Markets
            </a>
            <br />
            <a
              href=""
              style={{ textDecoration: "none" }}
              className="text-muted"
            >
              Sectors
            </a>
            <br />
          </div>
        </div>
        <div
        
          className="mt-5 text-muted "
          style={{ fontSize: "12px", opacity: "70%",marginLeft:"170px" }}
        >
          <p>
            LightEdge Broking Ltd.: Member of NSE​&​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through LightEdge Broking Ltd.
            – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through
            Zerodha
            <br /> Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration no.:
            INZ000038238 Registered Address: LightEdge Broking Ltd., #153/154, 4th
            Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th
            Phase, Bengaluru -<br /> 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@LightEdge.com, for DP related to dp@LightEdge.com. Please
            ensure you carefully read the Risk Disclosure
            <br /> Document as prescribed by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication,
            <br /> Speedy redressal of the grievances
          </p>

          <p>
            <a style={{ textDecoration: "none" }} href="">
              Smart Online Dispute Resolution
            </a>{" "}
            |{" "}
            <a style={{ textDecoration: "none" }} href="">
              Grievances Redressal Mechanism
            </a>
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            Attention investors: 1) Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f September 01, 2020. 2) Update your e-mail and phone number
            with your stock
            <br /> broker / depository participant and receive OTP directly from
            depository on your e-mail and/or mobile number to create pledge. 3)
            Check your securities / MF / bonds in the consolidated account
            statement issued by
            <br /> NSDL/CDSL every month.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of
            <br /> the day. Issued in the interest of investors. KYC is one time
            exercise while dealing in securities markets - once KYC is done
            through a SEBI registered intermediary (broker, DP, Mutual Fund
            etc.), you need not undergo
            <br /> the same process again when you approach another
            intermediary." Dear Investor, if you are subscribing to an IPO,
            there is no need to issue a cheque. Please write the Bank account
            number and sign the IPO application
            <br /> form to authorize your bank to make payment in case of
            allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on
            <br /> behalf of others. If you find anyone claiming to be part of
            LightEdge and offering such services, please
            <a style={{ textDecoration: "none" }} href="">
              {" "}
              create a ticket here
            </a>
            .
          </p>
          <div className="text-center space-between pb-5" style={{ fontSize:"122%",display:"flex", justifyContent:"center", gap:"20px"}}>
            <a style={{textDecoration:"none"}} href="">NSE</a>
            <a style={{textDecoration:"none"}} href="">BSE</a>
            <a style={{textDecoration:"none"}} href="">MCX</a>
            <a style={{textDecoration:"none"}} href="">Terms & conditions</a>
            <a style={{textDecoration:"none"}} href="">Policies & procedures</a>
            <a style={{textDecoration:"none"}} href="">Privacy policy</a>
            <a style={{textDecoration:"none"}} href="">Disclosure</a>
            <a style={{textDecoration:"none"}} href="">For investor's attention</a>
            <a style={{textDecoration:"none"}} href="">Investor charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
