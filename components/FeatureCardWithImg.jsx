import React from "react";

function FeatureCardWithImg({ title, description, imgSrc, center }) {
  return (
    <div>
      <div className="bg-card mt-10 flex flex-col gap-4 p-4 border rounded-md max-w-[350px]">
        <h3
          className={`lg:text-2xl text-xl font-medium ${
            center ? "text-center" : ""
          }`}
        >
          {title ? title : "Lorem ipsum dolor sit amet consectetur"}
        </h3>
        <p className=" text-muted-foreground">
          {description ? description : "Lorem ipsum dolor sit amet consectetur"}
        </p>

        <div className="h-[200px]">
          <img
            src={`${
              imgSrc
                ? imgSrc
                : "https://mir-s3-cdn-cf.behance.net/projects/404/374d8c110139351.Y3JvcCwxMDgwLDg0NCwwLDA.png"
            }`}
            alt="image-alt"
            className="object-cover h-full w-full rounded-md bg-muted"
          />
        </div>
      </div>
    </div>
  );
}

export default FeatureCardWithImg;
