import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { CabinProps } from "./CabinRow";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function EditCabin({ cabintoEdit }) {
  const { isEditing, editCabin } = useEditCabin();

  const isEditSession = Boolean(cabintoEdit?.id);

  const { handleSubmit, register, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? cabintoEdit : {},
  });

  const { errors } = formState;

  function onSubmit(data: CabinProps): void {
    editCabin(data, {
      onSuccess: () => {
        reset(data);
      },
    });
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
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isEditing}>Edit Cabin</Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default EditCabin;
