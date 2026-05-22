import supabase, { supabaseUrl } from "./supabase";

export interface AuthI {
  fullName?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export async function signUp({ fullName, email, password }: AuthI) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }: AuthI) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function updateCurrentUser({
  fullName,
  password,
  avatar,
}: {
  fullName?: string;
  password?: string;
  avatar?: string | File | null;
}) {
  //1. Update password or Fullname
  let updatedData: {
    password?: string;
    data?: {
      fullName?: string;
    };
  } = {};

  if (password) updatedData.password = password;
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Update the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3. Update avatar in the user
  const { data: updatedUser, error: err } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      fullName,
    },
  });
  if (err) throw new Error(err.message);
  return updatedUser;
}
