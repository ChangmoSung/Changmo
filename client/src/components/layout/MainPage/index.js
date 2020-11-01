import React, { useState, useEffect } from "react";
import "./index.scss";
import S3 from "aws-sdk/clients/s3";

const MainPage = () => {
  const [appImages, setAppImages] = useState([]);

  const imagesToRender = appImages.map((url) => (
    <div class="appImage">
      <img src={url}></img>
    </div>
  ));

  useEffect(() => {
    const {
      REACT_APP_AWS_ACCESS_KEY_ID: accessKeyId,
      REACT_APP_AWS_SECRET_ACCESS_KEY: secretAccessKey,
      REACT_APP_AWS_REGION: region,
      REACT_APP_AWS_S3_APP_IMAGES_BUCKET: Bucket,
    } = process.env;

    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      region,
    });
    const appImages = ["magicLand.png", "ChangmoSung.png", "smileyMagic.png"];
    const appImageUrls = appImages.map((url) =>
      s3.getSignedUrl("getObject", {
        Bucket,
        Key: url,
      })
    );
    setAppImages(appImageUrls);
  }, []);

  return (
    <div className="container mainPage">
      <div className=" wrapper mainPageContainer">
        <h1>Welcome!</h1>
        <div className="appContainer">{imagesToRender}</div>
      </div>
    </div>
  );
};

export default MainPage;
