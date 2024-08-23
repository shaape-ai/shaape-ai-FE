// PricePerformanceChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PriceGraph.css';

const PricePerformanceChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Price Performance',
        data: [10, 20, 50, 30, 40, 80, 60, 40],
        fill: false,
        backgroundColor: 'rgba(85, 120, 243, 1)',
        borderColor: 'rgba(85, 120, 243, 1)',
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
        beginAtZero: true,
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
