// // ====== INJECT CSS ======
// const style = document.createElement("style");
// style.innerHTML = `
//     body {
//         font-family: Arial, sans-serif;
//         padding: 60px;
//         background: #fff;
//     }

//     .faq-container {
//         width: 80%;
//         margin: auto;
//     }

//     .faq-title {
//         font-size: 32px;
//         font-weight: bold;
//         margin-bottom: 40px;
//     }

//     .faq-item {
//         padding: 25px 0;
//         border-bottom: 1px solid #ddd;
//         position: relative;
//         cursor: pointer;
//         font-size: 20px;
//     }

//     .blue-line {
//         width: 100px;
//         height: 4px;
//         background: #2f80ed;
//         margin-bottom: 15px;
//         transition: width 0.4s ease;
//     }

//     .faq-item:hover .blue-line {
//         width: 170px;
//     }

//     .faq-arrow {
//         position: absolute;
//         right: 0;
//         top: 32px;
//         font-size: 16px;
//         transition: transform 0.3s;
//     }

//     .faq-item.open .faq-arrow {
//         transform: rotate(180deg);
//     }

//     .faq-answer {
//         display: none;
//         padding: 15px 0 5px;
//         font-size: 18px;
//         color: #555;
//     }

//     .faq-item.open .faq-answer {
//         display: block;
//     }
// `;
// document.head.appendChild(style);


// // ====== INJECT HTML ======

// document.body.innerHTML = `
//     <div class="faq-container">
//         <div class="faq-title">FAQs</div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             What is a Zerodha account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">A Zerodha account allows you to trade stocks and invest.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             What documents are required to open a demat account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">PAN, Aadhaar, Bank Proof, and Photo.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             Is Zerodha account opening free?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">Yes, it is free to open an account.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             Are there any maintenance charges for a demat account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">AMC is applicable depending on the plan.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             Can I open a demat account without a bank account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">No, a bank account is required.</div>
//         </div>
//     </div>
// `;


// // ====== ADD FAQ OPEN/CLOSE FUNCTIONALITY ======

// document.querySelectorAll(".faq-item").forEach(item => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("open");
//     });
// });




// faq.js

// const faq = `
//     <style>
//         .faq-container {
//             width: 80%;
//             margin: 60px auto;
//             font-family: Arial, sans-serif;
//         }

//         .faq-title {
//             font-size: 32px;
//             font-weight: bold;
//             margin-bottom: 40px;
//         }

//         .faq-item {
//             padding: 25px 0;
//             border-bottom: 1px solid #ddd;
//             position: relative;
//             cursor: pointer;
//             font-size: 20px;
//         }

//         .blue-line {
//             width: 100px;
//             height: 4px;
//             background: #2f80ed;
//             margin-bottom: 15px;
//             transition: width 0.4s ease;
//         }

//         .faq-item:hover .blue-line {
//             width: 170px;
//         }

//         .faq-arrow {
//             position: absolute;
//             right: 0;
//             top: 32px;
//             font-size: 16px;
//             transition: transform 0.3s ease;
//         }

//         .faq-item.open .faq-arrow {
//             transform: rotate(180deg);
//         }

//         .faq-answer {
//             display: none;
//             padding: 15px 0 5px;
//             font-size: 18px;
//             color: #555;
//         }

//         .faq-item.open .faq-answer {
//             display: block;
//         }
//     </style>

//     <div class="faq-container">
//         <div class="faq-title">FAQs</div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             What is a Zerodha account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">A Zerodha account allows you to trade stocks and invest.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             What documents are required to open a demat account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">PAN, Aadhaar, Bank Proof, and Photograph.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             Is Zerodha account opening free?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">Yes, opening an account is free.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             Are there any maintenance charges for a demat account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">AMC charges apply depending on your plan.</div>
//         </div>

//         <div class="faq-item">
//             <div class="blue-line"></div>
//             Can I open a demat account without a bank account?
//             <span class="faq-arrow">⌄</span>
//             <div class="faq-answer">No, a bank account is required.</div>
//         </div>
//     </div>
// `;

// export default faq;
