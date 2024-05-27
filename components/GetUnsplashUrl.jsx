import React from "react";

export async function getUnsplashPhoto(query = "event") {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log("GetUrl", data.results[0].urls.full);
  return data.results[0].urls.full;
}

function GetUnsplashUrl() {
  getUrl();
  return <div>GetUnsplashUrl</div>;
}

export default GetUnsplashUrl;
