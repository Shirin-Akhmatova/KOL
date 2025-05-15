import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Calendar.scss";

const Calendar = () => {
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [date, setDate] = useState(new Date());
  const [editingMonth, setEditingMonth] = useState(false);
  const [editingYear, setEditingYear] = useState(false);
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [monthTouched, setMonthTouched] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);

  const year = date.getFullYear();
  const month = date.getMonth();

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  // Функция для сравнения двух дат (только день, месяц, год)
  const isSameDay = (d1: Date, d2: Date) =>
    d1 instanceof Date &&
    d2 instanceof Date &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  // Проверка, находится ли дата в выбранном диапазоне
  const isInRange = (day: number) => {
    if (!selectedStart || !selectedEnd) return false;
    const current = new Date(year, month, day);
    return current > selectedStart && current < selectedEnd;
  };

  const isStart = (day: number) => {
    if (!selectedStart) return false;
    return isSameDay(new Date(year, month, day), selectedStart);
  };

  const isEnd = (day: number) => {
    if (!selectedEnd) return false;
    return isSameDay(new Date(year, month, day), selectedEnd);
  };

  const handleSelectDate = (day: number) => {
    const selectedDate = new Date(year, month, day);

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(selectedDate);
      setSelectedEnd(null);
    } else if (selectedDate < selectedStart) {
      setSelectedStart(selectedDate);
      setSelectedEnd(null);
    } else {
      setSelectedEnd(selectedDate);
    }
  };

  const handlePrevMonth = () => {
    setDate(new Date(year, month - 1, 1));
    resetSelection();
  };

  const handleNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
    resetSelection();
  };

  const resetSelection = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const handleMonthClick = () => {
    setInputMonth(monthNames[month]);
    setMonthError("");
    setEditingMonth(true);
    setMonthTouched(false);
  };

  const handleYearClick = () => {
    setInputYear(year.toString());
    setYearError("");
    setEditingYear(true);
    setYearTouched(false);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMonth(e.target.value);
    setMonthError("");
    setMonthTouched(true);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputYear(e.target.value);
    setYearError("");
    setYearTouched(true);
  };

  const handleMonthSubmit = () => {
    const index = monthNames.findIndex(
      (m) => m.toLowerCase() === inputMonth.trim().toLowerCase()
    );
    if (index !== -1) {
      setDate(new Date(year, index, 1));
      setEditingMonth(false);
      setInputMonth("");
    } else {
      setMonthError("Неверный месяц");
      setEditingMonth(true);
    }
  };

  const handleYearSubmit = () => {
    const trimmed = inputYear.trim();
    if (!trimmed) {
      setInputYear(year.toString());
      setEditingYear(false);
      return;
    }

    const newYear = parseInt(trimmed);
    if (!isNaN(newYear) && newYear >= 1900 && newYear <= 2100) {
      setDate(new Date(newYear, month, 1));
      setEditingYear(false);
      setInputYear("");
    } else {
      setYearError("Так нельзя!");
      setEditingYear(true);
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleMonthSubmit();
    else if (e.key === "Escape") setEditingMonth(false);
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleYearSubmit();
    else if (e.key === "Escape") setEditingYear(false);
  };

  const daysArray = Array.from({ length: 42 }, (_, i) => i);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-btn" aria-label="Предыдущий месяц">
          <FiChevronLeft size={24} />
        </button>

        <div className="month-year-display">
          <div className="input-container">
            {editingMonth ? (
              <>
                <input
                  className={`month-input ${monthError && monthTouched ? "input-error" : ""}`}
                  value={inputMonth}
                  onChange={handleMonthChange}
                  onBlur={handleMonthSubmit}
                  onKeyDown={handleMonthKeyDown}
                  autoFocus
                  aria-label="Редактировать месяц"
                />
                <div className={`error-placeholder ${monthError && monthTouched ? "visible" : ""}`}>
                  {monthError && monthTouched ? monthError : ""}
                </div>
              </>
            ) : (
              <span className="month-display" onClick={handleMonthClick} tabIndex={0} role="button" aria-label="Выбрать месяц">
                {monthNames[month]}
              </span>
            )}
          </div>

          <div className="input-container">
            {editingYear ? (
              <>
                <input
                  className={`year-input ${yearError && yearTouched ? "input-error" : ""}`}
                  value={inputYear}
                  onChange={handleYearChange}   
                  onBlur={handleYearSubmit}
                  onKeyDown={handleYearKeyDown}
                  autoFocus
                  aria-label="Редактировать год"
                />
                <div className={`error-placeholder ${yearError && yearTouched ? "visible" : ""}`}>
                  {yearError && yearTouched ? yearError : ""}
                </div>
              </>
            ) : (
              <span className="year-display" onClick={handleYearClick} tabIndex={0} role="button" aria-label="Выбрать год">
                {year}
              </span>
            )}
          </div>
        </div>

        <button onClick={handleNextMonth} className="nav-btn" aria-label="Следующий месяц">
          <FiChevronRight size={24} />
        </button>
      </div>

      <div className="calendar-grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="day-name">{day}</div>
        ))}

        {daysArray.map((_, i) => {
          const dayNum = i - startDay + 1;
          if (dayNum < 1 || dayNum > daysInMonth) {
            return <div key={i} className="day empty" />;
          }

          const start = isStart(dayNum);
          const end = isEnd(dayNum);
          const inRange = isInRange(dayNum);

          return (
            <div
              key={i}
              className={`day ${start ? "start" : ""} ${end ? "end" : ""} ${
                inRange || start || end ? "in-range" : ""
              }`}
              onClick={() => handleSelectDate(dayNum)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectDate(dayNum);
                }
              }}
              aria-label={`Выбрать дату ${dayNum} ${monthNames[month]} ${year}`}
            >
              {(start || end) ? (
                <div className="circle">{dayNum}</div>
              ) : (
                <span>{dayNum}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
