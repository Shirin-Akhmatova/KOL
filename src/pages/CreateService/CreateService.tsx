import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddPhoto from "@/widgets/CreateService/AddPhoto";
import ObjectForm from "@/widgets/CreateService/ObjectForm";
import Amenities from "@/widgets/CreateService/Amenities";
import Date from "@/widgets/CreateService/Date";

// Типизация формы (добавь сюда все поля, которые ты используешь)
export interface FormData {
  name: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  category: string;
  rentalOption: string;
  photos: File[]; // или string[], если это URL
  // Добавляй сюда остальные поля формы
}

const CreateService = () => {
  const methods = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      name: { ru: "", en: "" },
      description: { ru: "", en: "" },
      category: "",
      rentalOption: "",
      photos: [],
      // другие поля...
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Форма отправлена:", data);
    localStorage.removeItem("objectDraft");
    // тут отправка данных на сервер
  };

  // Пример загрузки данных из localStorage при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem("objectDraft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        reset(parsed);
      } catch (e) {
        console.warn("Не удалось загрузить черновик из localStorage");
      }
    }
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddPhoto />
        <ObjectForm />
        <Amenities />
        <Date/>
        <div style={{ marginTop: "20px" }}>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateService;
