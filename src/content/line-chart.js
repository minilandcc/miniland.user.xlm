// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chartjs-plugin-annotation';

// const generateRandomData = () => {
//   const data = [160]; // Start at 160
//   for (let i = 1; i < 30; i++) {
//     data.push(data[i - 1] + Math.random() * 3); // Increment by a random value
//   }
//   return data;
// };

// const LineChart = () => {
//   const labels = Array.from({ length: 30 }, (_, i) => `${11 + i} Jun`);
//   const data = generateRandomData();

//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'INR',
//         data: data,
//         borderColor: 'rgba(0, 255, 0, 1)', // Green color
//         backgroundColor: 'rgba(0, 255, 0, 0.1)', // Light green background
//         fill: true,
//       }
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Date'
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Value in INR'
//         },
//         min: 160, // Minimum value on y-axis
//         max: Math.max(...data) + 5, // Slightly more than max data value
//       }
//     },
//     plugins: {
//       legend: {
//         display: false // Hide legend
//       },
//       annotation: {
//         annotations: [
//           {
//             type: 'line',
//             mode: 'horizontal',
//             scaleID: 'y',
//             value: 165, // Example annotation at value 165
//             borderColor: 'rgba(255, 99, 132, 0.75)',
//             borderWidth: 2,
//             label: {
//               enabled: true,
//               content: 'Threshold',
//             },
//           },
//         ],
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Growth Chart</h2>
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default LineChart;