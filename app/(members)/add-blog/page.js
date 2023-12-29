import Editor from "@/components/Editor";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import {
  ClerkLoading,
  SignIn,
  SignedIn,
  SignedOut,
  currentUser,
  useUser,
} from "@clerk/nextjs";

function AddBlog() {
  return (
    <div className="">
      <Toaster />

      <div className="mt-24">
        <Editor showProfile={1} />
      </div>

      <SignedOut>
        <ClerkLoading>
          <div className="flex justify-center items-center min-h-[80vh]">
            <Skeleton className="w-[280px] h-[280px] rounded-lg" />
          </div>
        </ClerkLoading>
        {/* <UserNotFound /> */}
      </SignedOut>
    </div>
  );
}

export default AddBlog;
