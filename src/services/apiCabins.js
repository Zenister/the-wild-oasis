import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// This is a function for creating and updating cabin
export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/update cabin
  let query = supabase.from("cabins");

  // A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. Update
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  // Deleting properly

  // Selecting the target cabin
  const { data: cabin, error: cabinReadError } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);

  if (cabinReadError) {
    console.error(cabinReadError);
    throw new Error("Cabins could not be read");
  }
  // create an imageName as a target for the bucket
  const imageName = cabin[0].image?.split("/").at(-1);

  // 2. Deleting the cabin data
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  // 3. Deleting the bucket cabin-images data
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);

  if (imageError) {
    console.error(cabinReadError);
    throw new Error("Cabin images from bucket cannot be deleted");
  }

  return data;

  // OLD VERSION
  // const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  // if (error) {
  //   console.error(error);
  //   throw new Error("Cabins could not be deleted");
  // }

  // return data;
}
