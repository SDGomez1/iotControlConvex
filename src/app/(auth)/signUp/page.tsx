import { SignUp } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <SignUp
      redirectUrl="/onboarding"
      appearance={{ variables: { colorPrimary: "#131217" } }}
    />
  );
}
