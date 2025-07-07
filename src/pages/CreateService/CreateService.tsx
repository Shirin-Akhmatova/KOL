import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useCallback, useState } from "react";
import { debounce } from "lodash";
import AddPhoto from "@/widgets/CreateService/AddPhoto";
import ObjectForm from "@/widgets/CreateService/ObjectForm";
import Amenities from "@/widgets/CreateService/Amenities";
import Date from "@/widgets/CreateService/ChooseDate";
import PriceRoom from "@/widgets/CreateService/PriceRoom";
import IndicateMap from "@/widgets/CreateService/IndicateMap";
import style from "./CreateService.module.scss";

type ImageItem = {
  id: string;
  file: File;
  preview: string;
  croppedPreview?: string;
};

interface Location {
  cordinates: [number, number];
  locationName: string;
}
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
  guests: number;
  bed: number;
  bathroom: number;
  subject: boolean;
  location: Location;
}

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
  location: {
    cordinates: [42.4602, 77.5085],
    locationName: "",
  },
};

const CreateService = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<FormData>({ mode: "onSubmit", defaultValues });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setLoading(false);
    }
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
        <IndicateMap />
        <button type="submit" style={{ marginTop: "20px" }}>
          Сохранить
        </button>
        {loading ? (
          <button disabled className={`${style.btn} ${style.loadingDots}`}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        ) : (
          <button className={`${style.btn} ${style.save}`} type="submit">
            Сохранить
          </button>
        )}
      </form>
    </FormProvider>
  );
};

export default CreateService;
