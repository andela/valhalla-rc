import React, { Component } from "react";

class ProductCategory extends Component {
  render() {
    return (
      <div className="category">
        <div className="container clothingSamples">
          <div className="row">
            <h2 className="subtitle fancy top-products browse"><span>BROWSE BY CATEGORY</span></h2>
            <div className="col-lg-12">
              <div className="col-lg-4">
                <a href="/tag/footwears">
                  <div className="categories">
                    <div id="corporate">
                      <img src="/resources/images/footwears.jpg" alt="" className="catImage"/>
                      <button className="btn btn" value="Corporates" id="catbtn">Footwears</button>
                    </div>
                  </div>
                </a>

                <a href="/tag/clothing">
                  <div className="categories">
                    <div id="corporate">
                      <img src="/resources/images/cloth.jpg" alt="" className="catImage"/>
                      <button className="btn btn" id="catbtn" value="Casuals">Clothing</button>
                    </div>
                  </div>
                </a>

              </div>
              <div className="col-lg-4">

                <a href="/tag/bags">
                  <div className="centerCategories">
                    <div id="corporate">
                      <img src="/resources/images/bag.jpg" alt="" className="catImageMiddle"/>
                      <button className="btn btn" value="Digital Products" id="catbtn">Bags</button>
                    </div>
                  </div>
                </a>

              </div>
              <div className="col-lg-4">
                <a href="/tag/jewelries">
                  <div className="categories">
                    <div id="corporate">
                      <img src="/resources/images/jewery.jpg" alt="" className="catImage"/>
                      <button value="Home Appliances" className="btn btn" id="catbtn">Jewelries</button>
                    </div>
                  </div>
                </a>

                <a href="/tag/head-gears">
                  <div className="categories">
                    <div id="corporate">
                      <img src="/resources/images/gele.jpg" alt="" className="catImage"/>
                      <button className="btn btn" value="Games and Accessories" id="catbtn">Head gears</button>
                    </div>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div><br/><br/><br/>
      </div>

    );
  }
}

export default ProductCategory;
