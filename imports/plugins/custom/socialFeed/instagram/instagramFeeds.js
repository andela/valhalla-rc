import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { InstagramPlugin } from "./instagramScript";

const InstagramFeeds = () => {
  return (
    <div className="instagram">
      <a href="https://www.instagram.com/fashionbombafrica">
        <img className="instagramImage" src="/resources/images/instagram.png" alt="instagramImage" />
      </a>
      <div className="elfsight-app-d09c24f0-8f5e-4be5-88b2-2ee32c1436d6" />
      {InstagramPlugin.render()}
    </div>
  );
};

registerComponent("InstagramFeeds", InstagramFeeds);
export default InstagramFeeds;

