"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { GoLinkExternal } from "react-icons/go";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";
import { getUnsplashPhoto } from "./GetUnsplashUrl";

function BlogCard({
  index,
  length,
  id,
  description,
  title,
  blog,
  username,
  link,
  editIcon,
  deleteIcon,
  type,
  imageUrl = "",
}) {
  const { toast } = useToast();
  const [unsplashPhoto, setUnsplashPhoto] = useState("");
  async function deleteBlog() {
    let res;
    if (type === "event-summary-card") {
      const eventSummaryRef = doc(db, "event-summaries", id);
      res = await deleteDoc(eventSummaryRef);
      console.log("Summary deleted");
    } else {
      const blogRef = doc(db, "blogs", id);
      res = await deleteDoc(blogRef);
      console.log("Blog deleted");
    }

    toast({
      title: `${type || "Blog"} Deleted Successfully`,
      description: `${
        type || "Blog"
      } with title ${title} was deleted successfully, refresh to see changes`,
    });
  }

  useEffect(() => {
    async function helper() {
      const url = await getUnsplashPhoto(blogData?.title);
      setUnsplashPhoto(url);
    }
    helper();
  }, []);

  return (
    <>
      <Toaster />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
        className="w-full max-w-[350px] flex-grow"
      >
        <Card className="duration-500 max-w-[350px] w-full flex-grow flex-col flex justify-between overflow-hidden h-full">
          <CardHeader className="h-full w-full">
            <div className="mb-2 flex justify-between">
              <Badge className="">
                {Math.ceil(length / 500)} minutes read.
              </Badge>

              <Link href={link}>{editIcon && <BiEdit size={25} />}</Link>

              <Link
                href={`/${
                  type === "event-summary-card" ? "event-summary" : "article"
                }/${id}`}
              >
                <GoLinkExternal size={25} />
              </Link>

              {deleteIcon && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <AiFillDelete size={25} />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure? This step is irreversible.
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Once you delete this blog, you cannot undo it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction variant="destructive" asChild>
                        <Button variant="destructive" onClick={deleteBlog}>
                          Delete Blog
                        </Button>
                      </AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            <CardTitle className="text-lg">
              <Link href={link}>{title || "No title provided"}</Link>
            </CardTitle>
            <div className="line-clamp-2">
              <p className="text-sm text-muted-foreground break-words">
                {description || "No description provided"}
              </p>
            </div>
          </CardHeader>
          <CardContent className="w-full">
            <img
              src={imageUrl || unsplashPhoto}
              alt="coming from unsplash"
              className="bg-secondary-foreground rounded-md h-[200px] w-full object-cover object-top"
            />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

export default BlogCard;
