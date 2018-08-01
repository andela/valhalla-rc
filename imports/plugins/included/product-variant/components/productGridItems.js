import React, { Component } from "react";
import PropTypes from "prop-types";
import Truncate from "react-truncate";
import { Components } from "@reactioncommerce/reaction-components";
import { formatPriceString } from "/client/api";

class ProductGridItems extends Component {
  static propTypes = {
    additionalMedia: PropTypes.func,
    canEdit: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    displayPrice: PropTypes.func,
    isMediumWeight: PropTypes.func,
    isSearch: PropTypes.bool,
    isSelected: PropTypes.func,
    media: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    pdpPath: PropTypes.func,
    positions: PropTypes.func,
    product: PropTypes.object,
    weightClass: PropTypes.func
  }

  handleDoubleClick = (event) => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(event);
    }
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  renderPinned() {
    return this.props.positions().pinned ? "pinned" : "";
  }

  renderVisible() {
    return this.props.product.isVisible ? "" : "not-visible";
  }

  renderOverlay() {
    if (this.props.product.isVisible === false) {
      return (
        <div className="product-grid-overlay" />
      );
    }
  }

  renderMedia() {
    if (this.props.media() === false) {
      return (
        <span className="product-image" style={{ backgroundImage: "url('/resources/placeholder.gif')" }} />
      );
    }
    return (
      <span className="product-image" style={{ backgroundImage: `url('${this.props.media().url({ store: "large" })}')` }}/>
    );
  }

  isSoldOut(productStatus) {
    if (!productStatus) {
      return null;
    }
    return <span className="sold_out">Sold out</span>;
  }

  renderProductMedia() {
    if (this.props.media() === false) {
      return "/resources/placeholder.gif";
    }
    return this.props.media().url({ store: "large" });
  }

  renderAdditionalMedia() {
    if (this.props.additionalMedia() !== false) {
      if (this.props.isMediumWeight()) {
        return (
          <div className={`product-additional-images ${this.renderVisible()}`}>
            {this.props.additionalMedia().map((media) => {
              return <span key={media._id} className="product-image" style={{ backgroundImage: `url('${media.url({ store: "medium" })}')` }} />;
            })}
            {this.renderOverlay()}
          </div>
        );
      }
    }
  }

  renderNotices() {
    return (
      <div className="grid-alerts">
        <Components.GridItemNotice product={this.props.product} />
        <Components.GridItemControls product={this.props.product} />
      </div>

    );
  }

  renderGridContent() {
    return (
      <div className="grid-content">
        <a
          href={this.props.pdpPath()}
          data-event-category="grid"
          data-event-action="product-click"
          data-event-label="grid product click"
          data-event-value={this.props.product._id}
          onDoubleClick={this.handleDoubleClick}
          onClick={this.handleClick}
        >
          <div className="overlay">
            <div className="overlay-title">{this.props.product.title}</div>
            <div className="currency-symbol">{formatPriceString(this.props.displayPrice())}</div>
            {this.props.isSearch &&
                <div className="overlay-description">{this.props.product.description}</div>
            }
          </div>
        </a>
      </div>
    );
  }

  renderHoverClassName() {
    return this.props.isSearch ? "item-content" : "";
  }

  render() {
    const productItem = (
      <a href={`/product/${this.props.product.handle}`} key={this.props.product._id}>
        <div className="col-lg-4 el-wrapper product-categories product-column">
          { this.isSoldOut(this.props.product.isSoldOut) }
          <div className="box-up">
            <img className="img" src={this.renderProductMedia()} alt="" />
            <div className="img-info">
              <div className="info-inner">
                <span className="p-company lead hide">
                  <Truncate lines={4}>
                    {this.props.product.description}
                  </Truncate>
                </span>
              </div>
            </div>
          </div>
          <h4 className="text-center">{this.props.product.title}</h4>
          <div className="box-down">
            <div className="h-bg">
              <div className="h-bg-inner" />
            </div>
            <span className="cart">
              <span className="price">${this.props.product.price.min}</span>
            </span>
          </div>
        </div>
      </a>
    );

    if (this.props.canEdit) {
      return (
        this.props.connectDropTarget(
          this.props.connectDragSource(productItem)
        )
      );
    }

    return productItem;
  }
}

export default ProductGridItems;
