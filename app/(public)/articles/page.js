"use client";
import ArticleCard from "@/components/ArticleCard";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { AiOutlineLoading } from "react-icons/ai";
import Loader from "@/components/Loader";
import data from "@/app/data";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Page() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]); // Store all articles without filters
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState(""); // State for filtering by name
  const [viewsFilter, setViewsFilter] = useState(null); // State for filtering by views
  const [selectedFilter, setSelectedFilter] = useState(null); // State for the selected filter
  const [visibleArticles, setVisibleArticles] = useState(6);

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
        setAllArticles(articlesArray); // Save all articles without filters
        setArticles(articlesArray); // Initially show all articles
      } catch (error) {
        console.error("Error getting articles (in /articles):", error);
      } finally {
        setLoading(false);
      }
    }

    getArticlesFromFirestore();
  }, []); // Fetch articles on mount

  // Apply client-side filters when nameFilter, viewsFilter, or selectedFilter changes
  useEffect(() => {
    let filteredArticles = allArticles.filter((article) =>
      article.title.toLowerCase().includes(nameFilter.toLowerCase())
    );

    // Apply views filter only if viewsFilter is greater than 0
    if (viewsFilter > 0) {
      filteredArticles = filteredArticles.filter(
        (article) => article.views >= viewsFilter
      );
    }

    // Apply selected filter
    if (selectedFilter === "views-desc") {
      filteredArticles = filteredArticles.sort((a, b) => b.views - a.views);
    } else if (selectedFilter === "views-asc") {
      filteredArticles = filteredArticles.sort((a, b) => a.views - b.views);
    } else if (selectedFilter === "readTime-desc") {
      filteredArticles = filteredArticles.sort(
        (a, b) => calculateReadTime(b) - calculateReadTime(a)
      );
    } else if (selectedFilter === "readTime-asc") {
      filteredArticles = filteredArticles.sort(
        (a, b) => calculateReadTime(a) - calculateReadTime(b)
      );
    } else if (selectedFilter === "timestamp-asc") {
      filteredArticles = filteredArticles.sort(
        (a, b) => a.timestamp - b.timestamp
      );
    } else if (selectedFilter === "timestamp-desc") {
      filteredArticles = filteredArticles.sort(
        (a, b) => b.timestamp - a.timestamp
      );
    }

    setArticles(filteredArticles);
  }, [nameFilter, viewsFilter, selectedFilter, allArticles]);

  const calculateReadTime = (article) => {
    // Assuming read time is calculated as article length / 100
    return Math.ceil(article.blog.length / 100);
  };

  // Load more articles when the button is clicked
  const handleLoadMore = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 6);
  };

  return (
    <section className="dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
      <div className="container w-full pt-12 pb-24 flex flex-col items-center min-h-[100vh]">
        <div className="w-full flex justify-center flex-col items-center mt-12">
          <div className="max-w-[800px]">
            <h1 className="lg:text-4xl text-3xl font-bold text-center">
              {data?.articlePageTitle}
              {" " + "(" + (loading ? "_" : articles.length) + ")"}
            </h1>

            <p className="text-muted-foreground mt-2 lg:mt-4 text-center">
              {data?.articlePageDescription}
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-between sm:mt-6 mt-4 gap-2 px-4 flex-wrap items-center w-full flex-col-reverse md:flex-row">
            {/* Filter by Views */}
            <Input
              type="number"
              min="0"
              placeholder="Filter by Min Views"
              value={viewsFilter}
              onChange={(e) => setViewsFilter(parseInt(e.target.value, 10))}
              className="max-w-[300px] md:max-w-[170px]"
            />

            {/* Filter by Name */}
            <Input
              type="text"
              placeholder="Filter by Article title"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="max-w-[300px] "
            />

            {/* Filter Select */}
            <Select
              onValueChange={(value) => setSelectedFilter(value)}
              className="border p-2"
            >
              <SelectTrigger
                className="w-[180px]"
                defaultValue="timestamp-desc"
              >
                <SelectValue placeholder="Filter articles" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="timestamp-desc">
                    Recent Articles
                  </SelectItem>
                  <SelectItem value="timestamp-asc">Old Articles</SelectItem>
                  <SelectItem value="views-desc">Views &darr;</SelectItem>
                  <SelectItem value="views-asc">Views &uarr;</SelectItem>
                  <SelectItem value="readTime-desc">
                    Read Time &uarr;
                  </SelectItem>
                  <SelectItem value="readTime-asc">Read Time &darr;</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Render Loading or Articles */}
        <div className="mt-2 md:mt-4 flex flex-wrap w-full justify-around gap-4 md:gap-6">
          {loading ? <Loader /> : ""}
          {articles.slice(0, visibleArticles).map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>

        {visibleArticles < articles.length && (
          <div className="flex justify-center mt-6">
            <Button onClick={handleLoadMore} variant="secondary">
              Load More Events &#10227;
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;
