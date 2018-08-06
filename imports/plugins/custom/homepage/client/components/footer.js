import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/components/lib";

class Footer extends Component {
  componentDidMount() {
    const scriptNode = document.getElementById("twitter-wjs");
    if (scriptNode) {
      scriptNode.parentNode.removeChild(scriptNode);
    }

    !(function (data, newScript, id) {
      let file;
      const element = data.getElementsByTagName(newScript)[0];
      const TweetsUrl = /^http:/.test(data.location) ? "http" : "https";
      if (!data.getElementById(id)) {
        file = data.createElement(newScript);
        file.id = id;
        file.src = TweetsUrl + "://platform.twitter.com/widgets.js";
        element.parentNode.insertBefore(file, element);
      }
    }(document, "script", "twitter-wjs"));
  }

  render() {
    return (
      <div>
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 footer-info">
                  <h3>About</h3>
                  <p>Reaction Commerce is the most popular open source, real-time platform
                   that combines the flexibility
                  developers and designers want with the
                  stability and support businesses need.
                  </p><br />
                  <img className="paystack" src="/resources/images/paystack.png" />
                </div>
                <div className="col-lg-3 col-md-3 footer-links">
                  <h4>Useful Links</h4>
                  <ul className="a__link">
                    <li>
                      <i className="ion-ios-arrow-right" />
                      <a href="/vendors">Vendors on AfriStore</a>
                    </li>
                    <li>
                      <i className="ion-ios-arrow-right" />
                      <a href="#">T & C Policy</a>
                    </li>
                    <li>
                      <i className="ion-ios-arrow-right" />
                      <a href="#about-me">Shipping & Returns</a>
                    </li>
                    <li>
                      <i className="ion-ios-arrow-right" />
                      <a href="#portfolio">About</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-3 col-md-3 footer-contact">
                  <h4>Contact Us</h4>
                  <p> 152 Ilupeju Road<br /> Ilupeju, Lagos<br /> Nigeria<br />
                    <strong>Phone:</strong> +2347031229501<br />
                    <strong>Email:</strong> info@andela.com<br />
                  </p>
                </div>

                <div className="col-lg-3 col-md-3 footer-contact">
                  <h4>We're Social</h4>
                  <a href="https://www.facebook.com/TheAfricanShop2013" target="_blank" className="zocial facebook"><i className="fa fa-facebook"></i> Like on Facebook &nbsp; &nbsp;</a><br /><br />
                  {/* <a href="#" target="_blank" className="zocial googleplus"><i className="fa fa-google-plus"></i> @afri_store &nbsp;</a><br /><br /> */}
                  <a href="https://twitter.com/PapstoreSA" target="_blank" className="zocial twitter"><i className="fa fa-twitter"></i>   @afri_store &nbsp;</a>
                </div>

              </div>
            </div>
          </div>
          <div className="container">
            <div className="copyright">
                        &copy; Copyright
              <strong>Andela Valhalla Team</strong>. All Rights Reserved
            </div>
          </div>
        </footer>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
      </div>
    );
  }
}
registerComponent("Footer", Footer);

export default Footer;
