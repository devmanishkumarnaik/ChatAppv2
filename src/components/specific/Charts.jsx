import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as chartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
//import purple from "../../constants/color";
import { orange, orangeLight, purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/features";

chartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
const labels = getLast7Days();
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({value=[]}) => {
  const data = {
    labels,
    datasets: [{
      data: value,
      label: "Messages",
      fill: true,
      backgroundColor: purpleLight,
      borderColor: purple,
    },
  ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: 120
}

const DoughnutChart = ({value=[], labels=[]}) => {
  const data = {
    labels,
    datasets: [{
      data: value,
      backgroundColor: [purpleLight, orangeLight],
      hoverBackgroundColor: [purple, orange],
      borderColor: [purple, orange],
      offset: 10
    },
  ],
  };
  return (
    <Doughnut style={{zIndex: 10}} data={data} options={doughnutChartOptions} />
  );
};

export { LineChart, DoughnutChart };
