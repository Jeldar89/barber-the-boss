import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/es";

// const maxTime = moment().set({
//   hour: 21,
//   minute: 0,
//   second: 0,
//   millisecond: 0,
// });
//const minTime = moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });

export default function CalendarDay() {
  const localizer = momentLocalizer(moment);
  return (
    <div title="a">
      <Calendar localizer={localizer} views={["day"]} />
    </div>
  );
}
