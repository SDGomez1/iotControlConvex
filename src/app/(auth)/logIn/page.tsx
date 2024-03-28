import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <SignIn
      redirectUrl="/adminDashboard"
      appearance={{ variables: { colorPrimary: "#131217" } }}
    />
  );
}
