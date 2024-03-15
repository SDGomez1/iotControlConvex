"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { ConvexReactClient } from "convex/react";
import { ConectedDeviceProvider } from "context/conectedDeviceContext";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);
export function Providers({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ConectedDeviceProvider>{children}</ConectedDeviceProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
