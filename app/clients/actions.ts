"use server";

import { z } from "zod";
import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export async function createClient(prevState: any, formData: FormData) {
  // Validate the form data
  const validatedFields = createSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Create the server client
  const supabase = createSupabaseClient();

  // Get logged in user from database
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // if user is not logged in, redirect to login page
    return redirect("/login");
  }

  // User is logged in and has permission to create clients, so let do that
  const { data, error } = await supabase.from("clients").insert({
    user_id: user.id,
    name: validatedFields.data.name,
    email: validatedFields.data.email,
  });

  // If there is an error, return an error message
  if (error) {
    return {
      status: "error",
      message: "An error occurred while creating the client",
    };
  }

  // If the client was created successfully, revalidate the clients page
  revalidatePath("/clients");

  // Return a success message
  return {
    status: "success",
    message: "Client created successfully",
  };
}
