import Header from "@/components/common/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
