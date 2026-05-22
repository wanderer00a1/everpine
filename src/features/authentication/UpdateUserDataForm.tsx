import { useState, type FormEvent } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const email = user?.email;
  const currentFullName = user?.user_metadata?.fullName;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<any>(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { avatar, fullName },
      {
        onSettled: () => {
          setAvatar(null);
          const form = e.target as HTMLFormElement;
          form.reset();
        },
      },
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input value={email} disabled />
      </FormRowVertical>
      <FormRowVertical label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files![0])}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical>
        <>
          <Button
            type="reset"
            variation="secondary"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRowVertical>
    </Form>
  );
}

export default UpdateUserDataForm;
