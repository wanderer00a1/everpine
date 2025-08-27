import supabase from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    //eslint-disable-next-line no-console
    console.error(error);
    throw new Error("cabins could not be loaded! ");
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
