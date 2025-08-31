import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { CabinProps } from "./CabinRow";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { editCabin } from "../../services/apiCabins";

function EditCabin({ cabintoEdit }) {
  const isEditSession = Boolean(cabintoEdit?.id);

  const { handleSubmit, register, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabintoEdit : {},
  });

  const { errors } = formState;
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      toast.success("Cabin edited successfully ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      //do this way coz reset from react-form-hook create problem
      const form = document.querySelector("form") as HTMLFormElement;
      if (form) {
        form.reset();
      }
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: CabinProps): void {
    mutate({ ...data, image: data.image[0] });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapcity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value: number) =>
              value <= +getValues().regularPrice ||
              "Discount should be less than regularPrice",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: false,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <div>
          <Button variation="secondary">Cancel</Button>
          <Button disabled={isEditing}>Edit Cabin</Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default EditCabin;
