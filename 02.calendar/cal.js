#!/usr/bin/env node
import minimist from "minimist";

const HEADER_WIDTH = 14;
const DAY_WIDTH = 2;
const BLANK_DAY = " ".repeat(3);
const FIRST_DAY_OF_MONTH = 1;

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;

const parseOptions = minimist(process.argv.slice(2), {
  string: ["-y", "-m"],
  alias: {
    y: "year",
    m: "month",
  },
  default: {
    y: currentYear,
    m: currentMonth,
  },
});

const year = parseOptions.year;
const month = parseOptions.month;

const getFirstDateOfMonth = () => {
  return new Date(year, month - 1, 1);
};

const getLastDateOfMonth = () => {
  return new Date(year, month, 0);
};

const generateCalendarHeader = () => {
  const monthName = getFirstDateOfMonth().toLocaleString("en-US", {
    month: "short",
  });
  return `${monthName} ${year}`.padStart(HEADER_WIDTH, " ");
};

const generateWeekHeader = () => {
  return "Su Mo Tu We Th Fr Sa";
};

const generateDayFormat = (day) => {
  const dayString = day.toString().padStart(DAY_WIDTH, " ");
  return dayString + " ";
};

const generateBlankDays = () => {
  return BLANK_DAY.repeat(getFirstDateOfMonth().getDay());
};

const isSaturday = (year, month, day) => {
  return new Date(year, month - 1, day).getDay() === 6;
};

const generateMonthDates = () => {
  const dayInMonth = getLastDateOfMonth().getDate();
  const monthDates = [];
  monthDates.push(generateBlankDays());

  for (let day = FIRST_DAY_OF_MONTH; day <= dayInMonth; day++) {
    monthDates.push(generateDayFormat(day));
    if (isSaturday(year, month, day)) {
      monthDates.push("\n");
    }
  }
  return monthDates.join("");
};

const run = () => {
  return [
    generateCalendarHeader(),
    generateWeekHeader(),
    generateMonthDates(),
  ].join("\n");
};

console.log(run());
