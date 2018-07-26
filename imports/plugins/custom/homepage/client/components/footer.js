import React, { Component } from "react";

class Footer extends Component {
  /* eslint-disable */
  componentWillMount() {
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
                  </p>
                </div>
                <div className="col-lg-3 col-md-3 footer-contact">
                  <h4>Payment Method</h4>
                  <br />
                  <p>
                    <img className="paystack" src="/resources/images/paystack.png" />
                  </p>
                </div>

                <div className="col-lg-3 col-md-3 footer-contact">
                  <h4>Contact Us</h4>
                  <p> 152 Ilupeju Road<br /> Ilupeju, Lagos<br /> Nigeria<br />
                    <strong>Phone:</strong> +2347031229501<br />
                    <strong>Email:</strong> info@andela.com<br />
                  </p>
                  <div className="social-links">
                    <a href="#" className="twitter">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="#" className="facebook">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#" className="instagram">
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 footer-twitter-feed">
                  {/* <!-- embed twitter media content --> */}
                  <a className="twitter-timeline" href="https://twitter.com/Afristore1?ref_src=twsrc%5Etfw">Tweets by Afristore1</a>
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
      /* eslint-enable */
    );
  }
}

export default Footer;
