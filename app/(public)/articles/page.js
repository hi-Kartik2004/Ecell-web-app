"use client";
import ArticleCard from "@/components/ArticleCard";
import { Suspense, useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineLoading } from "react-icons/ai";
import Loader from "@/components/Loader";

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
    <section className="dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
      <div className="container w-full pt-12 pb-24 flex flex-col items-center min-h-[100vh]">
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

        <div className="mt-4 flex flex-wrap w-full justify-around gap-6">
          {loading ? <Loader /> : ""}
          {articles.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;
