// //date-time
// export default function WebbDateTime() {
 
//   return (
//   <>
//     <div className="">
//       <span className="small text-tone">Today: {((new Date().toISOString().substr(0,10)))}</span>
//     </div>
//   </>
//   )
// }

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function WebbDateTimeMedium() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current date every second
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer); // Clear the timer on unmount
    };
  }, []);

  const formattedDate = format(date, "Pp"); // Format date consistently

  return (
    <div className="">
      <p className="m-0">Date: {formattedDate}</p>
    </div>
  );
}

