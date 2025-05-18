import Chart from "chart.js/auto";
import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import styles from "./PriceFilterChart.module.scss";
import globalStyles from "../../cardFilters.module.scss";
import type { IPrice } from "../../cardFilters.interface";

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  data: IPrice[];
  priceMin: number;
  priceMax: number;
  onChange?: (range: { min: number; max: number }) => void;
};

export default function PriceFilterChart({
  data,
  priceMin,
  priceMax,
  title,
  subtitle,
  description,
  onChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const [selectedMin, setSelectedMin] = useState<number>(priceMin);
  const [selectedMax, setSelectedMax] = useState<number>(priceMax);

  // Преобразуем данные в частотную гистограмму

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    if (chartRef.current) chartRef.current.destroy();
    const binCount = data.length;
    const binWidth = (priceMax - priceMin) / binCount;

    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: data.map((d) => d.cottage),
        datasets: [
          {
            label: "",
            data: data.map((d) => d.cottage),
            backgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              const binStart = priceMin + index * binWidth;
              const binEnd = binStart + binWidth;

              return binEnd >= selectedMin && binStart <= selectedMax
                ? "#00B2A9"
                : "rgba(0, 0, 0, 0.05)";
            },
            borderWidth: 0,
            borderRadius: 3,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            callbacks: {
              label: (ctx) => `Цена: ${ctx.label} — ${ctx.raw} объектов`,
            },
          },
        },
        scales: {
          x: {
            display: false,
            grid: { display: false },
          },
          y: {
            display: false,
            grid: { display: false },
            // beginAtZero: true,
            // suggestedMax: maxCount,
          },
        },
        onClick: (event, _, chart) => {
          const { offsetX } = event.native as MouseEvent;
          const { left, right } = chart.chartArea;
          const relativeX = offsetX - left;
          const width = right - left;
          const clickedRatio = relativeX / width;
          const clickedPrice = Math.round(
            priceMin + clickedRatio * (priceMax - priceMin)
          );

          // логика выбора диапазона: если оба выбраны — сбрасываем
          if (
            Math.abs(clickedPrice - selectedMin) >
            Math.abs(clickedPrice - selectedMax)
          ) {
            setSelectedMax(clickedPrice);
          } else {
            setSelectedMin(clickedPrice);
          }

          if (onChange) {
            onChange({
              min: Math.min(clickedPrice, selectedMax),
              max: Math.max(clickedPrice, selectedMin),
            });
          }
        },
      },
    });

    chartRef.current = chart;

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, [selectedMin, selectedMax, priceMin, priceMax]);

  return (
    <div>
      <div className={`${globalStyles.mb20} ${styles.priceFilterChartTitle}`}>
        <h3 className={globalStyles.title}>{title}</h3>
        <p className={globalStyles.subtitle}>{subtitle}</p>
        <p className={globalStyles.description}>{description}</p>
      </div>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "80px", position: "relative" }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
      <div className={styles.priceInputs}>
        <ChangePriceInput
          currency="сом"
          value={selectedMin}
          min={priceMin}
          max={selectedMax}
          onChange={(e) => setSelectedMin(Number(e.target.value))}
          style={{ maxWidth: "110px" }}
          inputLabel="Минимум"
          placeholder="0"
        />
        <ChangePriceInput
          currency="сом+"
          value={selectedMax}
          min={selectedMin}
          max={priceMax}
          onChange={(e) => setSelectedMax(Number(e.target.value))}
          style={{ maxWidth: "110px" }}
          inputLabel="Максимум"
          placeholder="0"
        />
      </div>
    </div>
  );
}

interface IChangePriceInput extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  currency: string;
}

const ChangePriceInput = ({
  inputLabel,
  currency,
  ...props
}: IChangePriceInput) => {
  return (
    <div className={styles.priceInput}>
      <p className={styles.priceInputLabel}>{inputLabel}</p>
      <div className={styles.priceInputContainer}>
        <div className={styles.priceInputCurrency}>{currency}</div>
        <input className={styles.priceInputInput} type="number" {...props} />
      </div>
    </div>
  );
};
