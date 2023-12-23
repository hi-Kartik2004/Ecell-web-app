import FeatureCardWithImg from "@/components/FeatureCardWithImg";
import GlassCard from "@/components/GlassCard";
import React from "react";

function RecentBlogs() {
  return (
    <div className="w-full lg:py-16 py-10 container">
      <div>
        <h2 className="lg:text-4xl text-2xl font-bold text-center">
          Lorem ipsum dolor sit.
        </h2>
        <p className="text-center mt-2 text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde amet
          repellat minima.
        </p>
      </div>

      <div className="flex flex-wrap justify-around gap-2 items-center mt-2 lg:mt-6 mb-8">
        <GlassCard className={"top-4 lg:right-2"} img={"https://mir-s3-cdn-cf.behance.net/projects/404/374d8c110139351.Y3JvcCwxMDgwLDg0NCwwLDA.png"} />

        <GlassCard className={"-bottom-6 right-2 lg:left-[50%]"} img={"https://mir-s3-cdn-cf.behance.net/projects/404/374d8c110139351.Y3JvcCwxMDgwLDg0NCwwLDA.png"} />

        <GlassCard className={"lg:top-4 lg:right-0 -bottom-6 left-2"} img={"https://mir-s3-cdn-cf.behance.net/projects/404/374d8c110139351.Y3JvcCwxMDgwLDg0NCwwLDA.png"} />
       
      </div>
    </div>
  );
}

export default RecentBlogs;
