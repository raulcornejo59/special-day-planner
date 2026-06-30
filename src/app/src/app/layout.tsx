export const metadata = {
  title: "Special Day Planner",
  description: "Business dashboard for proposals, engagements & weddings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
