import { authMiddleware, currentUser } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/events",
    "/register/(.*)",
    "/about",
    "/gallery",
    "/contact",
    "/event-summaries",
    "/event-summary/(.*)",
    "/api/webhook",
    "/registration-failed",
    "/redirect-works",
    "/api/handle-redirect",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// // check for membership
// const user = currentUser();

// if(user){
//   // call the api to check for membership
//   // if not a member, redirect to the membership page at /join
//   // if a member, continue

//   //call the api to check for admin
//   // if not a admin redirect to home page /
//   // if admin, continue

// }
