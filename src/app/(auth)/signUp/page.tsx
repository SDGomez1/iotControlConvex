import { SignUp } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <SignUp
      redirectUrl="/logIn"
      appearance={{ variables: { colorPrimary: "#131217" } }}
    />
  );
}
