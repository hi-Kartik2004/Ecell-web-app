import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/Navbar";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Foot from "@/components/Foot";
import FooterSection from "./(sections)/FooterSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecell UVCE 💡",
  description: "By the students, for the students!",
};

export default async function RootLayout({ children }) {
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
            <FooterSection />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
