// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export function DoughnutChart({ data }) {
//   return <Doughnut data={data} />;
// }


import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#eaf6ff",
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      tooltip: {
        titleColor: "#eaf6ff",
        bodyColor: "#eaf6ff",
        backgroundColor: "#102a43",
        borderColor: "#1f5a89",
        borderWidth: 1,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
