// PricePerformanceChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PriceGraph.css';

const PricePerformanceChart = ({prices}: any) => {

  const data = {
    labels: prices.labels,
    datasets: [
      {
        label: 'Price',
        data: prices.data,
        fill: false,
        backgroundColor: '#004AAD',
        borderColor: '#004AAD ',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 10,
        },
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Price Performance</h2>
      <Line className="chart-view" data={data} options={options} height={200} />
    </div>
  );
};

export default PricePerformanceChart;
