import { Skeleton } from "@/components/ui/skeleton";
import { ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section className="h-[100vh] flex items-center justify-center dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
        <ClerkLoading>
          <Skeleton className={"w-[400px] h-[500px]"} />
        </ClerkLoading>
        <SignIn />
      </section>
    </>
  );
}
