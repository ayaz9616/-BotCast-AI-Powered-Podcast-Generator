import { SignIn } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full flex-col bg-black">
      {/* Neon welcome heading */}
      <h1 className="text-[#00FF7F] text-4xl md:text-5xl font-extrabold mb-6 text-center neon-glow">
        Welcome to Botcast
      </h1>

      <SignIn
        appearance={{
          layout: {
            logoImageUrl: "/images/Screenshot (305).png", // use your Botcast logo path (add leading slash for public folder)
            logoPlacement: "inside", // valid Clerk value
            logoBoxClass: "!w-[140px] !h-[140px] !rounded-full !overflow-hidden !flex !items-center !justify-center !bg-black/80 !border-4 !border-[#00FF7F]", // make it circular, twice as big, with neon border
          },
          elements: {
            card: "bg-black/90 border-2 border-[#00FF7F] shadow-lg rounded-xl",
            headerTitle: "text-[#00FF7F] text-2xl font-extrabold",
            headerSubtitle: "text-white/80",
            formButtonPrimary:
              "!bg-[#00FF7F] !text-black font-bold hover:!bg-[#00ff7f]/80 border-2 border-[#00FF7F] !shadow-[0_0_12px_2px_#00FF7F] transition-all duration-200 [&>span]:!text-black [&>span]:!font-bold",
            formFieldInput: "bg-black/80 text-[#00FF7F] border-[#00FF7F] focus:ring-[#00FF7F]",
            footerAction:
              "text-[#00FF7F] hover:underline [&>a]:!text-[#00FF7F] [&>a]:hover:underline [&>a]:hover:text-white/80 [&>button]:!text-[#00FF7F] [&>button]:hover:text-white/80",
            socialButtonsBlockButton:
              "bg-black border-[#00FF7F] text-[#00FF7F] hover:bg-[#00FF7F] hover:text-black",
            dividerText: "text-[#00FF7F]",
            formFieldLabel: "text-[#00FF7F] font-semibold",
            formFieldHintText: "text-[#00FF7F]",
            formFieldErrorText: "text-[#00FF7F]",
            identityPreviewText: "text-[#00FF7F]",
            identityPreviewEditButton: "text-black bg-[#00FF7F] hover:bg-[#00ff7f]/80",
          },
          variables: {
            colorPrimary: "#00FF7F",
            colorText: "#00FF7F",
            colorBackground: "#000",
            colorInputBackground: "#111",
            colorInputText: "#00FF7F",
            colorDanger: "#00FF7F",
          },
        }}
      />
    </div>
  )
}

export default Page
