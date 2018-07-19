import React from "react";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import addToCartButtonCore from "/imports/plugins/included/product-detail-simple/client/components/addToCartButton";

class addToCartButton extends addToCartButtonCore {
  render() {
    if (this.hasVariants) {
      return (
        <div className="pdp add-to-cart block">
          <div className="quantity-container">
            <label htmlFor="add-to-cart-quantity">Quantity: </label>
            <input
              id="add-to-cart-quantity"
              min="1"
              name="addToCartQty"
              onChange={this.handleCartQuantityChange}
              type="number"
              value={this.props.cartQuantity}
            />
          </div>
          <button
            className="input-group-addon add-to-cart-text js-add-to-cart"
            data-i18n="productDetail.addToCart"
            onClick={this.props.onClick || this.props.onAddToCart}
          >
            <Components.Translation defaultValue="Add to cart" i18nKey="productDetail.addToCart" />
          </button>
        </div>
      );
    }

    if (this.props.editable && this.hasVariants === false) {
      return (
        <Components.Alert>
          <Components.Translation defaultValue="Add options to enable 'Add to Cart' button" i18nkey="productVariant.addVariantOptions" />
        </Components.Alert>
      );
    }
    return null;
  }
}

replaceComponent("AddToCartButton", addToCartButton);

export default addToCartButton;
