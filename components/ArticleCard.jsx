import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { Suspense } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";

function ArticleCard({ data }) {
  const timeAgo = formatDistanceToNow(new Date(data.timestamp), {
    addSuffix: true,
  });

  return (
    <Suspense fallback={"Loading..."}>
      <div>
        <div className="mt-10">
          <Card className="max-w-[400px] w-full md:w-[400px]">
            <CardHeader className="flex flex-col w-full">
              <div className="flex justify-between">
                <p className="text-muted-foreground text-xs">{timeAgo}</p>
                <p className="text-muted-foreground text-xs">{data.user}</p>
              </div>
              <div>
                <CardTitle className="leading-2 text-2xl line-clamp-2 mt-2">
                  {data.title}
                </CardTitle>
              </div>
            </CardHeader>
            <div className="text-muted-foreground line-clamp-3 px-5 -mt-2">
              <p>{data.description}</p>
            </div>
            <div className="w-full h-[200px] px-5 mt-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/015/573/452/original/sunset-landscape-with-bird-silhouettes-free-vector.jpg"
                alt="blog-card"
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <CardFooter className="w-full flex justify-between mt-4">
              <div className="flex gap-2 items-center">
                <BsFillPersonFill />
                473 views
              </div>
              <div>
                <Button variant="outline">
                  <Link href={`/article/${data.id}`}>Read more &rarr;</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Suspense>
  );
}

export default ArticleCard;
