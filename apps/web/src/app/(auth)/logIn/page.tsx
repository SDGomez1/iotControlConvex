import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <SignIn
      redirectUrl="/onboarding"
      appearance={{
        elements: {
          formButtonPrimary: "bg-slate-500",
          headerSubtitle: "hidden",
          card: "shadow-none border",
          headerTitle: "hidden",
        },
      }}
    />
  );
}
