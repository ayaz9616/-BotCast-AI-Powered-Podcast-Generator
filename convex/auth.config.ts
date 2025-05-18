// const authConfig = {
//   providers: [
//     {
//       domain: "https://novel-magpie-96.clerk.accounts.dev",
//       applicationID: "convex",
//     },
//   ]
// };

// export default authConfig;






// https://open-swine-56.clerk.accounts.dev

const authConfig = {
  providers: [
    {
    //   domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
        domain: "https://open-swine-56.clerk.accounts.dev ",
      applicationID: "convex",
    },
  ]
};

export default authConfig;



// import { defineAuth } from "convex/server";
// import { clerkAuth } from "convex-helpers/server/clerk";

// export default defineAuth({
//   providers: [clerkAuth()],
// });