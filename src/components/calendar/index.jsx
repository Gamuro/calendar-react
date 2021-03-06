import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSelectedDate,
  getSelectedMonth,
  getSelectedCalendarState,
  getSelectedWeek,
  getEvents,
} from "../../redux/selectors/dates";
import { MONTH, WEEK, DAY } from "../../constants/calendarStatuses";
import {
  createDaysOfWeeksForMonth,
  createDaysOfWeek,
  createHoursOfDay,
} from "../../helpers/datesHelper";
import { setSelectedDate, setSelectedCalendarState } from "../../redux/actions/dates";
import MonthCalendar from "../monthCalendar";
import WeekCalendar from "../weekCalendar";
import DayCalendar from "../dayCalendar";
import {
  addEventsToMonthCalendar,
  addEventsToWeekCalendar,
  addEventsToHoursOfDay,
} from "../../helpers/eventsHelper";
import { tablesSize } from "../../constants/tableSize";

const Calendar = () => {
  const dispatch = useDispatch();
  const {
    selectedDay,
    selectedMonth,
    calendarState,
    selectedWeek,
    events,
  } = useSelector((state) => ({
    selectedDay: getSelectedDate(state),
    selectedMonth: getSelectedMonth(state),
    selectedWeek: getSelectedWeek(state),
    calendarState: getSelectedCalendarState(state),
    events: getEvents(state),
  }));
  let calendar = createDaysOfWeeksForMonth(selectedMonth);
  calendar = addEventsToMonthCalendar(calendar, events);
  let weekCalendarList = createDaysOfWeek(selectedWeek);
  weekCalendarList = addEventsToWeekCalendar(weekCalendarList, events);
  let dayCalendarList = createHoursOfDay(selectedDay);
   addEventsToHoursOfDay(dayCalendarList, events);
  const handleChangeSelectedDay = (day) => {
    dispatch(setSelectedDate(day));
  };
  const handleClickMore = (day)=>{
    dispatch(setSelectedDate(day));
    dispatch(setSelectedCalendarState(DAY))
  }

  if (calendarState === MONTH)
    return (
      <MonthCalendar
        calendar={calendar}
        size={tablesSize.DEFAULT}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        handleChangeSelectedDay={handleChangeSelectedDay}
        handleClickMore={handleClickMore}
        isShowEvents={true}

      />
    );
  else if (calendarState === WEEK)
    return (
      <WeekCalendar
        weekCalendarList={weekCalendarList}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        handleChangeSelectedDay={handleChangeSelectedDay}
      />
    );
  else if (calendarState === DAY)
    return (
      <DayCalendar
        dayCalendarList={dayCalendarList}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
      />
    );
};

export default Calendar;
