import SignInProvider from "../components/SignInProvider";

export function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <SignInProvider
        text="Continue with Google"
        provider="google"
        image="/Google_logo.svg.webp"
      />
    </div>
  );
}

export default SignIn;
