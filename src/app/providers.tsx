"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { ConvexReactClient } from "convex/react";
import ContextProvider from "context/ContextProvider";
import StoreProvider from "./StoreProvider";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string,
);
export function Providers({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <StoreProvider>{children}</StoreProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
