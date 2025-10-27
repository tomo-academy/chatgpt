import Form from "next/form";

// Mock signOut function since we don't have auth
const signOut = async () => {
  console.log("Sign out functionality not implemented");
};

export const SignOutForm = () => {
  return (
    <Form
      action={async () => {
        "use server";

        await signOut();
      }}
      className="w-full"
    >
      <button
        className="w-full px-1 py-0.5 text-left text-red-500"
        type="submit"
      >
        Sign out
      </button>
    </Form>
  );
};
