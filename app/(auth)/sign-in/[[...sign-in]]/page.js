import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section className="h-[100vh] flex items-center justify-center dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
        <SignIn />
      </section>
    </>
  );
}
