import React from "react";

export default function YearMonthCalendarTitle({ currentYear, currentMonth }) {
  return (
    <>
      <div className="h-8">
        <p className="text-center">{currentYear}年{currentMonth}月</p>
      </div>
    </>
  );
}
