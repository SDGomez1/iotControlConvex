import { SignUp } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <SignUp
      redirectUrl="/adminDashboard"
      appearance={{ variables: { colorPrimary: "#131217" } }}
    />
  );
}
