import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

import { createCabin } from "../../services/apiCabins";
import type { CabinProps } from "./CabinRow";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { handleSubmit, register, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: CabinProps): void {
    mutate(data);
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
            validate: (value) =>
              value <= getValues().regularPrice ||
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
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <div>
          <Button variation="secondary" type="reset" id="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>Add cabin</Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
