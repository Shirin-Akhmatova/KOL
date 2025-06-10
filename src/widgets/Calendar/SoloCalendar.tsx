// Импорт React и хуков
import { useMemo, useState, useCallback } from "react";
// Импорт выпадающего списка
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Calendar.scss";
import Input from "@/shared/ui/input";

// Названия месяцев для отображения в выпадающем списке
const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const SoloCalendar = () => {
  // Генерация массива годов от 1999 до текущего года
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear(); // получаем текущий год
    return Array.from({ length: currentYear - 1998 }, (_, i) => 1999 + i); // создаем массив от 1999 до currentYear
  }, []);

  const today = useMemo(() => new Date(), []); // сохраняем сегодняшнюю дату, не пересоздаем на каждый рендер
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // выбранная дата
  const [month, setMonth] = useState<number>(today.getMonth()); // текущий месяц (0-11)
  const [year, setYear] = useState<number>(today.getFullYear()); // текущий год

  // Количество дней в выбранном месяце
  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate(); // последняя дата предыдущего месяца — это количество дней в текущем
  }, [year, month]);

  // День недели, с которого начинается месяц (0 — воскресенье, 6 — суббота)
  const startDay = useMemo(() => {
    return new Date(year, month, 1).getDay(); // получаем день недели первого числа месяца
  }, [year, month]);

  // Функция выбора даты
  const handleDateSelect = useCallback(
    (day: number) => {
      setSelectedDate(new Date(year, month, day)); // сохраняем выбранную дату
    },
    [year, month]
  );

  // Массив из 42 ячеек для календаря (6 строк по 7 дней)
  const daysArray = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => i); // заполняем числами от 0 до 41
  }, []);
  const handleNextOneMonth = (to: "forward" | "back") => {
    const date = new Date(year, to === "forward" ? month + 1 : month - 1, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };
  console.log(month);
  
  return (
    <div className="calendar">
      {/* Блок с выбором месяца и года */}
      <div className="calendar-header">
        <button
          onClick={() => handleNextOneMonth("back")}
          className="nav-btn"
          aria-label="Предыдущий месяц"
        >
          <FiChevronLeft size={24} />
        </button>
        {/* Выпадающий список месяцев */}
        <Input
          type="select"
          options={monthNames.map((el, idx) => ({
            label: el.toString(),
            value: idx.toString(),
          }))} // список годов в виде строк
          value={month.toString()} // выбранный год
          onChange={(month) => setMonth(Number(month))} // установка выбранного года
        />
        {/* Выпадающий список годов */}
        <Input
          type="select"
          options={years.map((el) => ({
            label: el.toString(),
            value: el.toString(),
          }))} // список годов в виде строк
          value={year.toString()} // выбранный год
          onChange={(year) => setYear(Number(year))} // установка выбранного года
        />

        <button
          onClick={() => handleNextOneMonth("forward")}
          className="nav-btn"
          aria-label="Следующий месяц"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Заголовок дней недели */}
      <div className="calendar-grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="day-name">
            {d}
          </div> // отображаем сокращения дней недели
        ))}

        {/* Основная сетка календаря */}
        {daysArray.map((_, i) => {
          const day = i - startDay + 1; // высчитываем дату, которая должна быть отображена в ячейке
          const isCurrentMonth = day > 0 && day <= daysInMonth; // определяем, относится ли дата к текущему месяцу
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year; // проверка, выбрана ли текущая дата

          return (
            <div key={i} className="day">
              {isCurrentMonth ? (
                <button
                  onClick={() => handleDateSelect(day)} // клик по дню
                  className={`day ${
                    isSelected
                      ? "circle" // если выбрана — подсвечиваем
                      : "" // иначе — подсветка при наведении
                  }`}
                >
                  {day} {/* отображаем номер дня */}
                </button>
              ) : (
                <span className="day empty"></span> // если день вне текущего месяца — пустая ячейка
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
