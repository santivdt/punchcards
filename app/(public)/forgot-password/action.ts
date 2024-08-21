"use server";
import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import { forgotSchema } from "./schema";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const forgotPassword = async (prevData: any, formData: FormData) => {
  const validatedFields = forgotSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: "Invalid email",
    };
  }

  const supabase = createSupabaseClient();
  // Get the headers object
  const headersList = headers();
  // Get the host and protocol from the headers
  const host = headersList.get("host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "http";

  // Construct the full URL
  const baseUrl = `${protocol}://${host}`;

  const { error } = await supabase.auth.resetPasswordForEmail(
    validatedFields.data.email,
    {
      redirectTo: `${baseUrl}/reset-password`,
    },
  );

  if (error) {
    return {
      status: "error",
      errors: error.message,
    };
  }

  return {
    status: "success",
    message: "Password reset link sent",
  };
};
