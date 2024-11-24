import { format } from "date-fns";

function getMonthDays(timestamp) {
  let date;

  // Check if a valid timestamp is provided
  if (timestamp && !isNaN(timestamp)) {
    date = new Date(parseInt(timestamp));
  } else {
    date = new Date(); // Default to current date
  }

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based month index

  // Calculate the first and last day of the month
  const startDate = new Date(year, month, 1); // First day of the month
  const endDate = new Date(year, month + 1, 1); // First day of the next month

  // List to store the days of the month
  const daysList = [];

  // Loop through each day of the month
  for (
    let day = new Date(startDate);
    day < endDate;
    day.setDate(day.getDate() + 1)
  ) {
    daysList.push(format(new Date(day), "d MMM")); // Format date as d MMM
  }

  return daysList;
}

export default getMonthDays;
