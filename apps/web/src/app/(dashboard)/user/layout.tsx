import Skeleton from "components/dashboard/Skeleton";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Skeleton>{children}</Skeleton>;
}
