"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createOrRetrieveCustomer } from "@/utils/supabase/admin";
export const SignupWithOAuth = async (provider: "google" | "github") => {
  const supabase = createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/callback/googlesignup`,
    },
  });

  return redirect(data.url!);
};

export const signUp = async (prevData: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
  });
  if (data?.user?.id) {
    const bla = await createOrRetrieveCustomer({ email, uuid: data.user.id });
    console.log(bla);
  }
  console.log(data, error);

  if (
    data &&
    data.user &&
    data.user.identities &&
    data.user.identities.length === 0
  ) {
    return {
      status: "error",
      message:
        "This email address is already associated with an existing account.",
    };
  }

  if (error) {
    return redirect("/signup?message=Could not complete sign-up of user");
  }

  return redirect(
    "/login?message=Check your email to confirm your email address. You can sign in afterwards",
  );
};
