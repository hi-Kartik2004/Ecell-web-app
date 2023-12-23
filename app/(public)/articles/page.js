"use client";
import ArticleCard from "@/components/ArticleCard";
import { Suspense, useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineLoading } from "react-icons/ai";

function Page() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getArticlesFromFirestore() {
      const articlesRef = collection(db, "blogs");
      const q = query(articlesRef, orderBy("timestamp", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const articlesArray = [];
        querySnapshot.forEach((doc) => {
          articlesArray.push({ ...doc.data(), id: doc.id });
        });
        setArticles(articlesArray);
      } catch (error) {
        console.error("Error getting articles (in /articles):", error);
      } finally {
        setLoading(false);
      }
    }

    getArticlesFromFirestore();
  }, []);

  return (
    <section className="container pt-12 pb-16 flex justify-center flex-col items-center">
      <div className="max-w-[800px] mt-12">
        <h1 className="lg:text-4xl text-3xl font-bold text-center">
          Place a mode toggle on{" "}
          <span className="text-primary">your site to toggle.</span>
        </h1>

        <p className="text-muted-foreground mt-2 lg:mt-4 text-center">
          Place a mode toggle on your site to toggle between light and dark
          mode.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap w-full justify-around">
        {loading ? (
          <div className="flex flex-col gap-2 mt-16 items-center">
            {/* <div className="animate-spin"> */}
            <AiOutlineLoading size={35} className="animate-spin" />
            {/* </div> */}

            <p className="mt-4 text-xl">Loading...</p>
          </div>
        ) : (
          ""
        )}
        {articles.map((article) => (
          <ArticleCard key={article.id} data={article} />
        ))}
      </div>
    </section>
  );
}

export default Page;
