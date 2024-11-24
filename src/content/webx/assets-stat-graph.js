// import React, { useEffect, useRef, useState } from "react";
// import Chart from "chart.js/auto";
// import {
//   AssetsNAVChangeList,
//   NAVSChangeList,
// } from "../../services/srvc-navs-realm";
// import { TransfersAssetGraph } from "../../services/srvc-transfers-assets-realm";
// import { useParams } from "react-router-dom";
// import { format } from "date-fns";

// const AssetsStatGraph = (props) => {
//   const { id } = useParams();
//   const chartRef = useRef(null);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [dateLable, setDateLabel] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await AssetsNAVChangeList({
//           data: {
//             asset: id,
//           },
//         });
//         if (res && res.data) {
//           const items = res.data.list;
//           setCurrentItems(items);
//           setDateLabel(
//             items
//               .reverse()
//               .map((item) => format(new Date(Number(item.date)), "d MMM"))
//           );
//           console.log("NavGraph data--23-->", items);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [props.unit]);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     const yValues =
//       currentItems.length > 1
//         ? currentItems.map((item) => item.navx)
//         : currentItems.length == 1
//         ? [currentItems[currentItems.length - 1]?.number, "0"]
//         : [props.rate, "0"];
//     // yValues.reverse();

//     const data = {
//       labels: dateLable,
//       datasets: [
//         {
//           label: "Sale",
//           data: yValues,
//           borderColor: "navy",
//           borderWidth: 2,
//           fill: {
//             target: "origin",
//             above: "rgba(173, 216, 230, 0.3)", // High opacity
//             below: "rgba(173, 216, 230, 0)", // Low opacity
//           },
//           tension: 0.4, // Adjust the tension for a smoother curve
//           pointRadius: 0,
//         },
//       ],
//     };

//     const config = {
//       type: "line",
//       data: data,
//       options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         plugins: {
//           legend: {
//             display: false,
//           },
//           layout: {
//             padding: {
//               top: 20,
//               bottom: 20,
//               left: 20,
//               right: 20,
//             },
//           },
//           tooltips: {
//             mode: "index",
//             intersect: false,
//           },
//         },
//         scales: {
//           x: {
//             grid: {
//               display: false,
//             },
//             // title: {
//             //   display: true,
//             //   text: "Date →",
//             //   align: "center",
//             // },
//           },
//           y: {
//             beginAtZero: true,
//             grid: {
//               display: false,
//             },
//             // title: {
//             //   display: true,
//             //   text: "NAV Rate →",
//             //   align: "center",
//             // },
//           },
//         },
//       },
//     };

//     const myChart = new Chart(ctx, config);

//     return () => {
//       myChart.destroy();
//     };
//   }, [chartRef, currentItems]);

//   return (
//     <div className="border p-3 rounded-xd" style={{ width: "100%", height: "50%" }}>
//       <canvas ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default AssetsStatGraph;


import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { AssetsNAVChangeList } from "../../services/srvc-navs-realm";
import { useParams } from "react-router-dom";
import { format, subMonths, addMonths } from "date-fns";
import getMonthDays from "../monthly-days";

const AssetsStatGraph = (props) => {
  const { id } = useParams();
  const chartRef = useRef(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [dateLabel, setDateLabel] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  console.log("Current Month :", currentMonth);

  // const specificMonthDays = getMonthDays(currentMonth.getTime());
 

  const fetchData = async (month) => {
    try {
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const res = await AssetsNAVChangeList({
        data: {
          asset: id,
          date: endOfMonth.getTime(),
        },
      });
      if (res && res.data) {
        let items = res.data.list;
        items.reverse();
        setCurrentItems(items);
        // setDateLabel(
        //   items
        //     .reverse()
        //     .map((item) => format(new Date(Number(item.date)), "d MMM"))
        // );
        setDateLabel(getMonthDays(currentMonth.getTime()));
        
        console.log("NavGraph data--23-->", items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentMonth);
  }, [props.unit, currentMonth]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const yValues =
      currentItems.length > 1
        ? currentItems.map((item) => item.navx)
        : currentItems.length === 1
        ? [currentItems[currentItems.length - 1]?.number, "0"]
        : [props.rate, "0"];

    const data = {
      labels: dateLabel,
      datasets: [
        {
          label: "Sale",
          data: yValues,
          borderColor: "navy",
          borderWidth: 2,
          fill: {
            target: "origin",
            above: "rgba(173, 216, 230, 0.3)", // High opacity
            below: "rgba(173, 216, 230, 0)", // Low opacity
          },
          tension: 0.4, // Adjust the tension for a smoother curve
          pointRadius: 0,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          layout: {
            padding: {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            },
          },
          tooltips: {
            mode: "index",
            intersect: false,
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
      },
    };

    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, [chartRef, currentItems]);

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div
      className="border p-3 rounded-xd "
      style={{ width: "100%", height: "55%" }}
    >
      <div className="d-flex gap-3 mb-3 mt-2 align-items-center">
        <div
          className="cursor bg-body-tertiary rounded-circle d-flex justify-content-center align-items-center"
          style={{ height: "25px", width: "25px" }}
          onClick={handlePreviousMonth}
        >
          <i class="bx bx-left-arrow-alt"></i>
        </div>
        <span className="text-small">{format(currentMonth, "MMMM yyyy")}</span>
        <div
          className="cursor bg-body-tertiary rounded-circle d-flex justify-content-center align-items-center"
          style={{ height: "25px", width: "25px" }}
          onClick={handleNextMonth}
        >
          <i class="bx bx-right-arrow-alt"></i>
        </div>
      </div>
      <canvas className="mb-5" ref={chartRef}></canvas>
    </div>
  );
};

export default AssetsStatGraph;
