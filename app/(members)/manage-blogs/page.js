import { SignIn, SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import React, { Suspense } from "react";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import globalData from "@/app/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import UserNotFound from "@/app/components/UserNotFound";

async function ManageBlogs() {
  const user = await currentUser();
  let blogsData = [];

  if (user) {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("email", "==", user.emailAddresses[0].emailAddress),
      orderBy("timestamp", "desc")
    );
    const blogsCollection = await getDocs(q);
    blogsData = blogsCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  return (
    <>
      <SignedIn>
        <div className="container flex flex-col items-center mt-20 mb-24">
          <div className="flex justify-center text-center max-w-[800px] flex-col items-center mb-12">
            <h1 className="text-center my-2 text-3xl font-bold">
              <span className="text-primary">
                {(user && user.firstName) || "Not found"}'s
              </span>{" "}
              Blogs
            </h1>

            <p className="text-muted-foreground">
              {globalData?.manageBlogsPageDescription}
            </p>
          </div>
          <Suspense fallback={<Loader />}>
            <div className="container flex flex-wrap justify-around gap-4 min-h-[60vh]">
              {blogsData.length === 0 && (
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-semibold">
                    No Articles found.{" "}
                    <span className="text-primary">Create one!</span>
                  </h1>

                  <Button className="mt-6">
                    <Link href={"/add-blog"}>
                      Create and publish an article{" "}
                    </Link>
                  </Button>
                </div>
              )}
              {user &&
                blogsData.map((blog, index) => (
                  <div key={index}>
                    <BlogCard
                      length={blog.blog.length}
                      title={blog.title}
                      description={blog.description}
                      link={`edit-blog/${blog.id}`}
                      username={user.username || "Not found"}
                      editIcon={1}
                      deleteIcon={1}
                      id={blog.id}
                    />
                  </div>
                ))}
            </div>
          </Suspense>
        </div>
      </SignedIn>
    </>
  );
}

export default ManageBlogs;
