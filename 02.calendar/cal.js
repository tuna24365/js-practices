#!/usr/bin/env node
import minimist from "minimist";

const HEADER_WIDTH = 14;

const run = () => {
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

  return [
    generateCalendarHeader(year, month),
    generateWeekHeader(),
    generateMonthDates(year, month),
  ].join("\n");
};

const generateCalendarHeader = (year, month) => {
  const monthName = getFirstDateOfMonth(year, month).toLocaleString("en-US", {
    month: "short",
  });
  return `${monthName} ${year}`.padStart(HEADER_WIDTH, " ");
};

const getFirstDateOfMonth = (year, month) => {
  return new Date(year, month - 1, 1);
};

const generateWeekHeader = () => {
  return "Su Mo Tu We Th Fr Sa";
};

const generateMonthDates = (year, month) => {
  const dayInMonth = getLastDateOfMonth(year, month).getDate();
  let monthDates = generateBlankDays(year, month);

  for (let day = 1; day <= dayInMonth; day++) {
    monthDates += generateDayFormat(day);
    if (isSaturday(year, month, day)) {
      monthDates += "\n";
    }
  }
  return monthDates;
};

const getLastDateOfMonth = (year, month) => {
  return new Date(year, month, 0);
};

const generateBlankDays = (year, month) => {
  return "   ".repeat(getFirstDateOfMonth(year, month).getDay());
};

const generateDayFormat = (day) => {
  const dayString = day.toString().padStart(2, " ");
  return dayString + " ";
};

const isSaturday = (year, month, day) => {
  return new Date(year, month - 1, day).getDay() === 6;
};

console.log(run());
