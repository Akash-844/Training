import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Task-Management",
    default: "Task-Management"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
