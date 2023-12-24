import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Foot from "@/components/Foot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecell UVCE 💡",
  description: "By the students, for the students!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Foot />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
