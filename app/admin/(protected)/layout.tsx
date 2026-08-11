import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isValid = await isAdminSessionValid();
  if (!isValid) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
