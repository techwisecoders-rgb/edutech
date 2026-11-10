import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber Tech Academy & Education Portal",
  description: "Explore computer science courses and education pathways.",
  applicationName: "Cyber Tech Academy"
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#040407" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script src="/register-sw.js" defer /></body></html>;
}
