import React, { Component } from "react";
// import Categories from "./categories";

class Carousel extends Component {
  render() {
    return (
      <div className="row car">
        <div>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* <div className="collapse categories" id="categories">
              <Categories />
            </div> */}

            <div className="carousel-inner">

              <div className="item active">
                <img src="resources/images/home.png" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Revamp Your <span className="special-text">Style</span> This Season</h1>
                  <p>Shop our affordable clothing</p>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/home2.png" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Stylish <span className="special-text">Watches</span> to Compliment Your Look</h1>
                  <p>Find the perfect trendy timepiece</p>
                </div>
              </div>

            </div>


            <a className="left carousel-control chevron" href="#myCarousel" data-slide="prev">
              <span className="fa fa-chevron-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control chevron" href="#myCarousel" data-slide="next">
              <span className="fa fa-chevron-right" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
