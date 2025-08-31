import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    //eslint-disable-next-line no-console
    console.error(error);
    throw new Error("cabins could not be loaded! ");
  }
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCabin(newCabin: any) {
  //create cabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //https://lgmlkbrwgbzvfugwchsn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error }: { data: any; error: unknown } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);
  if (error) {
    //eslint-disable-next-line no-console
    console.error(error);
    throw new Error("cabins could not be created! ");
  }

  //upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Delete the cabin if there was error in uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data!.id);
    // eslint-disable-next-line no-console
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin cannot be created"
    );
  }

  return data;
}

//Edit a cabin
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editCabin(newCabin: any) {
  const { data: oldCabin, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", newCabin.id)
    .single();

  if (fetchError) {
    console.log(newCabin);
    throw new Error("Could not fetch old cabin data");
  }

  const oldImagePath = oldCabin.image;
  const isExistingImage =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  let imagePath = newCabin.image as string;

  if (!isExistingImage) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", newCabin.id)
    .select()
    .single();

  if (error) throw new Error("Cabin could not be updated");

  if (!isExistingImage) {
    const imageName = imagePath.split("/").pop()!;
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase
        .from("cabins")
        .update({ image: oldImagePath })
        .eq("id", newCabin.id);
      throw new Error("Cabin image could not be uploaded, old image restored");
    }

    if (oldImagePath.startsWith(supabaseUrl)) {
      const oldFileName = oldImagePath.split("/").pop()!;
      await supabase.storage.from("cabin-images").remove([oldFileName]);
    }
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    //eslint-disable-next-line no-console
    console.error(error);
    throw new Error("cabins could not be deleted! ");
  }
}

export default getCabins;
