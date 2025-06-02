import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { translateText } from "@/shared/ui/translateText";
import { debounce } from "lodash";
import scss from "./ObjectForm.module.scss";
import house from "@/../public/imgs/room_type/family_room.svg";
import budget from "@/../public/imgs/room_type/budget_room.svg";
import hotel from "@/../public/imgs/room_type/hotel_room.svg";
import lakeHouse from "@/../public/imgs/room_type/lake_house.svg";
import Eco from "@/../public/imgs/room_type/eco_tourism.svg";

interface Category {
  icon: string;
  title: string;
}

interface FormData {
  category: string;
  name: {
    ru: string;
    en: string;
  };
  rentalOption: string;
  description: {
    ru: string;
    en: string;
  };
}

const categories: Category[] = [
  { icon: house, title: "Семейные коттеджи" },
  { icon: budget, title: "Бюджетное жильё" },
  { icon: hotel, title: "Гостиничные номера" },
  { icon: lakeHouse, title: "Домики у озера" },
  { icon: Eco, title: "Экотуризм" },
];

const rentalOptions = ["Весь объект", "Отдельная комната", "Койко-место"];

const ObjectForm = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: JSON.parse(localStorage.getItem("objectDraft") || "{}") || {
      category: "",
      name: {
        ru: "",
        en: "",
      },
      rentalOption: rentalOptions[0],
      description: {
        ru: "",
        en: "",
      },
    },
  });
  const [category, setCategory] = useState<string>(getValues("category"));
  function cleanText(text: string) {
    return text
      .trim()
      .replace(/\s+([.,!?;:])/g, "$1") // убираем пробел перед знаками препинания
      .replace(/\s+/g, " "); // убираем лишние пробелы
  }

  const debouncedTranslate = useCallback(
    debounce(
      async (
        field: "name" | "description",
        text: string,
        fromLang: "ru" | "en",
        toLang: "ru" | "en"
      ) => {
        const res = await translateText(cleanText(text), fromLang, toLang);

        const currentField = getValues(field) || {};
        const newField = {
          ...currentField,
          [fromLang]: text,
          [toLang]: res,
        };

        if (currentField[toLang] !== res) {
          setValue(field, newField);
          localStorage.setItem(
            "objectDraft",
            JSON.stringify({
              ...getValues(),
              [field]: newField,
            })
          );
        }
      },
      1000
    ),
    [getValues, setValue]
  );

  useEffect(() => {
    const subscription = watch((data) => {
      const descText =
        typeof data.description === "string"
          ? data.description
          : data.description?.ru || "";
      const nameText =
        typeof data.name === "string" ? data.name : data.name?.ru || "";

      if (nameText.length > 2) {
        const ruCount = (nameText.match(/[а-яё]/gi) || []).length;
        const enCount = (nameText.match(/[a-z]/gi) || []).length;
        const fromLang = ruCount >= enCount ? "ru" : "en";
        const toLang = fromLang === "ru" ? "en" : "ru";

        debouncedTranslate("name", nameText, fromLang, toLang);
      }

      if (descText.length > 2) {
        const ruCount = (descText.match(/[а-яё]/gi) || []).length;
        const enCount = (descText.match(/[a-z]/gi) || []).length;
        const fromLang = ruCount >= enCount ? "ru" : "en";
        const toLang = fromLang === "ru" ? "en" : "ru";

        debouncedTranslate("description", descText, fromLang, toLang);
      }

      if (data.category !== category) {
        localStorage.setItem("objectDraft", JSON.stringify(data));
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedTranslate.cancel();
    };
  }, [watch, debouncedTranslate]);
  return (
    <div className={scss.ObjectForm}>
      <div className="container">
        <div className={scss.content}>
          <div>
            <h1>Выберите категорию объекта</h1>
            <div className={scss.categories}>
              {categories.map((item, index) => (
                <div
                  onClick={() => {
                    setValue("category", item.title);
                    setCategory(item.title);
                  }}
                  className={`${scss.category} ${
                    item.title === category ? scss.active : ""
                  }`}
                  key={index}
                >
                  <img src={item.icon} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1>Название объекта</h1>
            <input
              {...register("name.ru", { required: true })}
              type="text"
              placeholder="Придумайте название для своего объекта"
            />
          </div>

          <div>
            <h1>Варианты сдачи объекта</h1>
            <select
              {...register("rentalOption", { required: true })}
              onChange={(e) => {
                const value = e.target.value;
                const draft = { ...getValues(), rentalOption: value };
                localStorage.setItem("objectDraft", JSON.stringify(draft));
              }}
            >
              {rentalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Описание объекта</h1>
            <textarea
              {...register("description.ru", {
                required: true,
              })}
              placeholder="Расскажите о своем объекте..."
              rows={5}
              className={errors.description ? scss.errorInput : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectForm;
