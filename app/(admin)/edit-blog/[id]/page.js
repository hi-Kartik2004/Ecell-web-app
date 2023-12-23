import { SignIn, SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import React from "react";
import Editor from "@/components/Editor";

async function EditBlog({ params }) {
  const user = await currentUser();

  const blogRef = doc(db, "blogs", params.id);
  const snapshot = await getDoc(blogRef);

  const data = snapshot.data();

  const blogData = data;
  console.log("Blog Data", blogData);

  if (!blogData) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <h1 className="text-3xl font-bold">Incorrect Blog id</h1>
      </div>
    );
  }

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <>
      <SignedOut>{/* <UserNotFound /> */}</SignedOut>

      <SignedIn>
        <div className="mt-24">
          <div className="container">
            <Editor
              gradient="Edit"
              sectionTitle="your blog"
              buttonText="Confirm Edit"
              buttonType="edit"
              blogId={params.id}
              blogCode={blogData.blog}
              blogTitle={blogData.title}
              blogDescription={blogData.description}
            />
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export default EditBlog;
