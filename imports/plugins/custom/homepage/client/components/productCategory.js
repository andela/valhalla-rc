import React, { Component } from "react";

class ProductCategory extends Component {
  render() {
    return (
      <div id="category">
        <div className="category">
          <div className="container clothingSamples">
            <div className="row">
              <h2 className="subtitle fancy top-products browse"><span>TOP CATEGORIES</span></h2>
            </div>
            <div className="row">
              <div className="col-lg-4 category-column product-column">
                <a href="/tag/footwears">
                  <div className="categories">
                    <div id="corporate">
                      <button className="btn btn" value="Corporates" id="catbtn">Footwears</button>
                    </div>
                  </div>
                </a>

                <a href="/tag/clothing">
                  <div className="categories">
                    <div id="corporate">
                      <button className="btn btn" id="catbtn" value="Casuals">Clothing</button>
                    </div>
                  </div>
                </a>

              </div>
              <div className="col-lg-4 category-column product-column">
                <a href="/tag/jewelries">
                  <div className="categories">
                    <div id="corporate">
                      <button value="Home Appliances" className="btn btn" id="catbtn">Jewelries</button>
                    </div>
                  </div>
                </a>

                <a href="/tag/bags">
                  <div className="categories">
                    <div id="corporate">
                      <button className="btn btn" value="Games and Accessories" id="catbtn">Bags</button>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 category-column product-column">
                <a href="/tag/skin-care">
                  <div className="categories">
                    <div id="corporate">
                      <button value="Home Appliances" className="btn btn" id="catbtn">Skin care</button>
                    </div>
                  </div>
                </a>

                <a href="/tag/head-gears">
                  <div className="categories">
                    <div id="corporate">
                      <button className="btn btn" value="Games and Accessories" id="catbtn">Head gears</button>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div><br/><br/><br/>
        </div>
      </div>

    );
  }
}

export default ProductCategory;
