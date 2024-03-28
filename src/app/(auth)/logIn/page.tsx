import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <SignIn
      redirectUrl="/onboarding"
      appearance={{ variables: { colorPrimary: "#131217" } }}
    />
  );
}
