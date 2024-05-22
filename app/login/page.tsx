import { signIn, signUp } from "@/app/login/actions";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <SubmitButton
        formAction={signIn}
        className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Signing In..."
      >
        Sign In
      </SubmitButton>
      <SubmitButton
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Signing Up..."
      >
        Sign Up
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
