import React, { Component } from "react";

class Carousel extends Component {
  render() {
    return (
      <div className="row car">
        <div>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">

              <div className="item active">
                <img src="resources/images/home3.png" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Fashion has to <span className="special-text">reflect</span> who you are</h1>
                  <p> What You Feel At The Moment, Where You're Going </p>
                </div>
              </div>

              <div className="item">
                <img src="resources/images/home4.jpg" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Stylish <span className="special-text">Bags</span> to Compliment Your Outfit</h1>
                  <p>Find the perfect trendy timepiece</p>

                </div>
              </div>

              <div className="item">
                <img src="resources/images/home2.png" className="carousel-img"/>
                <div className="carousel-caption">
                  <h1>Standout with our <span className="special-text">Head Gear</span> to Compliment Your Look</h1>
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
