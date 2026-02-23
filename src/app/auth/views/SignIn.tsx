import SignInProvider from "../components/SignInProvider";

export function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-4xl mb-6 font-medium">Continue to Job Tracker</h1>
      <SignInProvider
        text="Continue with Google"
        provider="google"
        image="/Google_logo.svg.png"
      />
    </div>
  );
}

export default SignIn;
