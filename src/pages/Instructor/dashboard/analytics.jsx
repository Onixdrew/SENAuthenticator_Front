// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Doughnut } from 'react-chartjs-2';

// const Analytics = () => {
//   const lineData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: 'Visits',
//         data: [3.2, 3.8, 4.1, 3.9, 4.5, 4.2, 4.7, 4.3, 4.8, 4.5, 4.9, 5.0],
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   const doughnutData = {
//     labels: ['Desktop', 'Mobile', 'Tablet'],
//     datasets: [
//       {
//         data: [92.8, 6.1, 1.1],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Line Chart */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <Line data={lineData} />
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h4>Conversion</h4>
//           <p>492</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h4>Impressions</h4>
//           <p>87k</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h4>Visits</h4>
//           <p>882</p>
//         </div>
//       </div>

//       {/* Doughnut Chart */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <Doughnut data={doughnutData} />
//       </div>
//     </div>
//   );
// };

// export default Analytics;
