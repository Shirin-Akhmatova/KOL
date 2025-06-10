import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import AddPhoto from "@/widgets/CreateService/AddPhoto";
import ObjectForm from "@/widgets/CreateService/ObjectForm";
import Amenities from "@/widgets/CreateService/Amenities";
import Date from "@/widgets/CreateService/ChooseDate";
import PriceRoom from "@/widgets/CreateService/PriceRoom";

export interface FormData {
  photos: ImageItem[];
  category: string;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  rentalOption: string;
  amenities: string[];
  minNight: number;
  maxNight: number;
  hourHandle: string;
  minuteHandle: string;
  price: number;
  discountWeek: number;
  discountMonth: number;
  bedroom: number;
  bed: number;
  bathroom: number;
  guests: number;
  subject: boolean;
}

type ImageItem = {
  id: string;
  file: File;
  preview: string;
  croppedPreview?: string;
};

const defaultValues: FormData = {
  photos: [],
  category: "",
  name: { ru: "", en: "" },
  description: { ru: "", en: "" },
  rentalOption: "",
  amenities: [],
  minNight: 1,
  maxNight: 365,
  hourHandle: "00",
  minuteHandle: "00",
  price: 0,
  discountWeek: 0,
  discountMonth: 0,
  bedroom: 0,
  bed: 0,
  bathroom: 0,
  guests: 1,
  subject: false,
};

const CreateService = () => {
  const methods = useForm<FormData>({ mode: "onSubmit", defaultValues });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Форма отправлена:", data);
  };

  const saveToLocalStorage = useCallback(
    debounce((data: FormData) => {
      localStorage.setItem("objectDraft", JSON.stringify(data));
    }, 500),
    []
  );

  useEffect(() => {
    const subscription = watch((data) => saveToLocalStorage(data as FormData));
    return () => subscription.unsubscribe();
  }, [watch, saveToLocalStorage]);

  useEffect(() => {
    const savedData = localStorage.getItem("objectDraft");
    if (savedData) reset(JSON.parse(savedData));
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddPhoto />
        <ObjectForm />
        <Amenities />
        <Date />
        <PriceRoom />
        <button type="submit" style={{ marginTop: "20px" }}>
          Сохранить
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateService;
