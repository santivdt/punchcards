"use server"

import { Tables } from "@/types/supabase"
import { createClient as createSupabaseClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const createSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const getClientsFromUser = async (userId: Tables<"users">["id"]) => {
  const supabase = createSupabaseClient();

  return supabase
    .from("clients")
    .select(`id, name, email, user_id`)
    .order("created_at", { ascending: false })
    .eq("user_id", userId);
}

export const createClient = async (prevState: any, formData: FormData) => {
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

export  const deleteSingleClient = async (id: string) => {
  console.log('deleteSingleClient', id)
  const supabase = createSupabaseClient();
  return supabase.from('clients').delete().eq('id', id).throwOnError()
}
  
