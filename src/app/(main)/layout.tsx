import Navbar from "@/components/layouts/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex-1">{children}</div>
    </>
  );
}

