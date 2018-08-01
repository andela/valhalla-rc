import React, { Component } from "react";
import RenderCategory from "./RenderCategory";

class Carousel extends Component {
  render() {
    return (
      <div className="row car">
        <div>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <RenderCategory />
            <div className="carousel-inner">

              <div className="item active">
                <img src="resources/images/home3.png" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Fashion that <span className="special-text">reflects</span> the <span className="special-text">African</span> in you</h1>
                  <p> Shop for best-selling african attires </p>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/home4.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Stylish <span className="special-text">Bags</span> to Compliment Your Outfit</h1>
                  <p> Find the perfect bag that suits your lifestyle </p>

                </div>
              </div>

              <div className="item">
                <img src="resources/images/home2.png" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Standout with <span className="special-text">Head Gears</span> to Compliment Your Look</h1>
                  <p>Looking for trendy african hats? We got you covered</p>
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
