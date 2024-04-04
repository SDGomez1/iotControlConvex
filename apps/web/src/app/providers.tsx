"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { ConvexReactClient } from "convex/react";
import { esES } from "@clerk/localizations";

import StoreProvider from "./StoreProvider";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string,
);
export function Providers({ children }: PropsWithChildren) {
  const localization = {
    headerTitle: "Inicia sesion",
  };

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={esES}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <StoreProvider>{children}</StoreProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
