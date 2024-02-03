import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Inter } from "next/font/google";
import FooterSection from "./(sections)/FooterSection";
import "./globals.css";
import { isMatch } from "date-fns";
import SecretMenu from "@/components/SecretMenu";
import { defaultInternalThemeFoundations } from "@clerk/themes/dist/clerk-js/src/ui/foundations";
var axios = require("axios");

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecell UVCE 💡",
  description: "By the students, for the students!",
};

export default async function RootLayout({ children }) {
  const user = await currentUser();
  async function checkAdmin() {
    if (!user) {
      return { isMember: false, isAdmin: false };
    }

    const email = user.emailAddresses[0].emailAddress;

    var data = JSON.stringify({
      collection: "subscribers",
      database: "subscribers",
      dataSource: "Cluster0",
      filter: {
        email: email,
      },
    });

    var config = {
      method: "post",
      url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-wtzjz/endpoint/data/v1/action/findOne",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key":
          "8xyZSAUDmD1HMh3E3gjGhijlKitYPmnw8i4yTtY8QmMXelkyRCsQrrkp8FwkuBNM",
      },
      data: data,
    };

    return axios(config)
      .then(function (response) {
        const checkData = response.data;
        // console.log("checkdata " + checkData);
        if (checkData.document == null) {
          // console.log("working");
          return { isMember: false, isAdmin: false };
        } else {
          // console.log("working");
          // console.log(checkData.document.admin);
          return { isMember: true, isAdmin: checkData.document.admin };
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });

    // console.log(check);
  }

  const details = await checkAdmin();

  console.log(details);

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
            {details.isAdmin ? (
              <SecretMenu admin={true} />
            ) : details.isMember ? (
              <SecretMenu admin={false} />
            ) : null}
            {children}

            <FooterSection isMember={details.isMember} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
