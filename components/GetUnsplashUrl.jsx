import React from "react";

export async function getUnsplashPhoto(query = "event") {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (data && data.results && data.results.length > 0) {
    console.log("GetUrl", data.results[0].urls.full);
    return data.results[0].urls.full;
  }

  return "https://images.unsplash.com/photo-1515261439133-0f6cfb098e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
}

function GetUnsplashUrl() {
  getUrl();
  return <div>GetUnsplashUrl</div>;
}

export default GetUnsplashUrl;
