import { FormProvider, useForm } from "react-hook-form";
import AddPhoto from "@/widgets/CreateService/AddPhoto";

const CreateService = () => {
  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AddPhoto />
      </form>
    </FormProvider>
  );
};

export default CreateService;
