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

export default getCabins;
