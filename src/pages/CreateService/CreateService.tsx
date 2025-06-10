import { useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddPhoto from "@/widgets/CreateService/AddPhoto";
import ObjectForm from "@/widgets/CreateService/ObjectForm";
import Amenities from "@/widgets/CreateService/Amenities";
import Date from "@/widgets/CreateService/Date";
import PriceRoom from "@/widgets/CreateService/PriceRoom";
import { debounce } from "lodash";

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
  images: File[];
  price: number;
  discountWeek: number;
  discountMonth: number;
}

const CreateService = () => {
  const methods = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      name: { ru: "", en: "" },
      description: { ru: "", en: "" },
      category: "",
      rentalOption: "",
      images: [],
      price: 0,
      discountWeek: 0,
      discountMonth: 0,
    },
  });

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Форма отправлена:", data);
    // Очищаем localStorage после успешной отправки
    // localStorage.removeItem("objectDraft");
  };

  // Функция для сохранения в localStorage с debounce
  const saveToLocalStorage = useCallback(
    debounce((data: FormData) => {
      try {
        // Преобразуем данные для хранения (особенно если есть File объекты)
        const dataToStore = {
          ...data,
          // FileList/File объекты не сериализуются, нужно обработать отдельно
          photos: data.images.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          })),
        };
        localStorage.setItem("objectDraft", JSON.stringify(dataToStore));
      } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
      }
    }, 500),
    []
  );

  // Следим за изменениями формы
  useEffect(() => {
    const subscription = watch((data) => {
      saveToLocalStorage(data as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, saveToLocalStorage]);

  // Загрузка сохраненных данных при монтировании
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
        <Date />
        <PriceRoom />
        <div style={{ marginTop: "20px" }}>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateService;