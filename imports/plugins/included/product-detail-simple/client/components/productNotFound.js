import React from "react";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import RenderCategory from "../../../../custom/homepage/client/components/RenderCategory";

const ProductNotFound = () => {
  return (
    <TranslationProvider>
      <div className="container-fluid-sm">
        <RenderCategory />
        <div className="empty-view-message">
          <i className="fa fa-barcode" />
          <Components.Translation defaultValue="Oops" i18nKey="productDetail.notFoundTitle" />
          <Components.Translation defaultValue="Product Not Found" i18nKey="productDetail.notFoundError" />
        </div>
      </div>
    </TranslationProvider>
  );
};

registerComponent("ProductNotFound", ProductNotFound);

export default ProductNotFound;
