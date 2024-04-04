import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 lg:gap-10">
      {children}
      {/* <Link
        href="/"
        className="border-b border-b-neutral-500 text-neutral-500 "
      >
        ← Volver
      </Link> */}
    </main>
  );
}
