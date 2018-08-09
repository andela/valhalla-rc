import _ from "lodash";
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Reaction, i18next } from "/client/api";
import classnames from "classnames";
import { Accounts } from "meteor/accounts-base";
import { LoginFormValidation } from "/lib/api";
import extractName from "/imports/plugins/custom/helper";
import { Random } from "meteor/random";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import Select from "react-select";
import startTour from "/imports/plugins/custom/vendor-tour/client/vendorTour";
import customerTour from "/imports/plugins/custom/customer-tour/client/customerTour";

const options = [
  { value: "clothing", label: "Clothing" },
  { value: "footwears", label: "Footwears" },
  { value: "headGear", label: "Head gear" },
  { value: "bags", label: "Bags" },
  { value: "Jeweleries", label: "Jeweleries" },
  { value: "skinCare", label: "Skin care" }
];

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      selectedOption: "customer",
      shopName: "",
      productTypes: [],
      TCAgreed: false,
      formMessages: {},
      isLoading: false
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.checkBoxChange = this.checkBoxChange.bind(this);
  }

  handleStartTour = () => {
    Reaction.Router.go("/");
    startTour();
  }

  handleStartCustomerTour = () => {
    Reaction.Router.go("/");
    customerTour();
  }

  handleFieldChange = (event, value, field) => {
    if (field === "password") {
      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
      if (!strongRegex.test(value)) {
        this.setState({
          formMessages: {
            ...this.state.formMessages,
            password: `Your password must contain be at least 8 character containing
              at least 1 lowercase alphabet, 1 uppercase alphabet, and 1 number`
          }
        });
      } else {
        this.setState({
          formMessages: {
            ...this.state.formMessages,
            password: ""
          }
        });
      }
    }

    this.setState({
      [field]: value
    });

    if (field === "confirmPassword") {
      if (this.state.password !== value) {
        this.setState({
          formMessages: {
            ...this.state.formMessages,
            confirmPassword: "Password and confirm password do not match"
          }
        });
      } else {
        this.setState({
          formMessages: {
            ...this.state.formMessages,
            confirmPassword: ""
          }
        });
      }
    }
  }

  handleDropDownChange = (productTypes) => {
    if (productTypes.length <= 3) {
      return this.setState({ productTypes });
    }
    this.setState({
      formMessages: {
        ...this.state.formMessages,
        productTypes: "You can only select a maximum of three products type for now"
      }
    });
  }

  checkBoxChange = (event) => {
    this.setState({
      [event.target.name]: !this.state.TCAgreed
    });
  }

  vendorDetails = () => {
    const { formMessages, productTypes } = this.state;

    if (this.state.selectedOption === "merchant") {
      return (
        <div className="row mt-2">
          <div className="col-sm-6">
            <Components.TextField
              label="Shop Name"
              name="shopName"
              type="text"
              tabIndex="2"
              value={this.state.shopName}
              onChange={this.handleFieldChange}
            />
            {
              formMessages.shopName &&
              <span className="help-block signup-error">
                <Components.Translation
                  defaultValue={formMessages.shopName}
                />
              </span>
            }
          </div>
          <div className="col-sm-6">
            <label>
              <Components.Translation defaultValue="Product Type"/>
            </label>
            <div className="w-100">
              <Select
                multi={true}
                name="productTypes"
                options={options}
                className="create-component-select multi-select"
                placeholder="Select Type of product you would like to sell"
                noResultsText="Product type not available"
                onChange={this.handleDropDownChange}
                value={productTypes}
                backspaceToRemoveMessage="remove"
              />
              {
                formMessages.productTypes &&
                <span className="help-block signup-error">
                  <Components.Translation
                    defaultValue={formMessages.productTypes}
                  />
                </span>
              }
            </div>
          </div>
        </div>
      );
    }
  }

  handleRoleChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const {
      email, password, confirmPassword, selectedOption, shopName, productTypes, TCAgreed
    } = this.state;

    this.setState({ isLoading: true });
    const errors = {};
    const username = email.trim();
    const pword = password.trim();

    const validatedEmail = LoginFormValidation.email(username);
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (!strongRegex.test(pword)) {
      errors.password = `Your password must contain be at least 8 character containing
      at least 1 lowercase alphabet, 1 uppercase alphabet, and 1 number`;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password and confirm password do not match";
    }

    if (validatedEmail !== true) {
      errors.email = validatedEmail;
    }

    if (!TCAgreed) {
      errors.TCAgreed = "Tick the box to agree to our terms and conditions";
    }

    if (selectedOption === "merchant" && (!shopName || shopName.trim() === "")) {
      errors.shopName = "Please input the name of your shop";
    }

    if (selectedOption === "merchant" && productTypes.length === 0) {
      errors.productTypes = "Please select the type of products you would like to sell";
    }

    if (_.isEmpty(errors) === false) {
      this.setState({
        isLoading: false,
        formMessages: { ...errors }
      });
      return;
    }

    const newUserData = {
      email: username,
      password: pword
    };

    Accounts.createUser(newUserData, (error) => {
      if (error) {
        this.setState({
          isLoading: false,
          formMessages: {
            alerts: [error]
          }
        });
      } else {
        const name =  extractName(username);
        Reaction.Router.go("/");

        // alert for successfully registered customer
        if (selectedOption === "customer") {
          Alerts.alert({
            title: `Hi ${name}, Welcome to AfriStore!`,
            type: "success",
            imageHeight: 150,
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Take a Tour"
          },
          confirmed => {
            if (confirmed) {
              this.handleStartCustomerTour();
            }
            return false;
          });
        }

        if (selectedOption === "merchant") {
          Meteor.call("shop/createShop", Meteor.userId(), (err, response) => {
            if (err) {
              const errorMessage = i18next.t("marketplace.errorCannotCreateShop", { defaultValue: "Could not create shop for current user {{user}}" });
              return Alerts.toast(`${errorMessage} ${err}`, "error");
            }

            // alert for successfully registered merchant
            Alerts.alert({
              title: `Hi ${name}, Welcome to AfriStore.`,
              type: "success",
              imageHeight: 150,
              showCancelButton: true,
              cancelButtonText: "No",
              confirmButtonText: "Take a Tour"
            },
            confirmed => {
              if (confirmed) {
                this.handleStartTour();
              }
              return false;
            }
            );

            // function to update shop details
            Meteor.call("marketplace/updateShopWorkflow", response.shopId, "active", shopName);
          });
        }
      }
    });
  }

  renderSpinnerOnWait() {
    if (this.state.isLoading) {
      return (
        <div style={{ textAlign: "center" }}>
          <i className="fa fa-spinner fa-spin" />
        </div>
      );
    }
    return (
      <Components.Button
        className="btn-block"
        primary={true}
        bezelStyle="solid"
        i18nKeyLabel="accountsUI.signUpButton"
        label="Register"
        type="submit"
        tabIndex="3"
        eventAction="register"
      />
    );
  }

  renderFormMessages = () => {
    return (
      <div>
        <Components.LoginFormMessages
          messages={this.state.formMessages}
        />
      </div>
    );
  }

  renderForm(emailClasses, passwordClasses) {
    const uniqueId = Random.id();
    const { formMessages } = this.state;

    return (
      <form className="login-form" onSubmit={this.handleFormSubmit}>
        <div style={{ width: "60%", margin: "0 auto" }}>

          {this.renderFormMessages()}

          <div className={emailClasses}>
            <Components.TextField
              i18nKeyLabel="accountsUI.emailAddress"
              label="Email"
              name="email"
              type="email"
              tabIndex="1"
              id={`email-${uniqueId}`}
              value={this.state.email}
              onChange={this.handleFieldChange}
            />
            {
              formMessages.email &&
              <span className="help-block signup-error">
                <Components.Translation
                  defaultValue={formMessages.email.reason}
                />
              </span>
            }
          </div>

          <div className={passwordClasses}>
            <Components.TextField
              i18nKeyLabel="accountsUI.password"
              label="Password"
              name="password"
              type="password"
              tabIndex="2"
              id={`password-${uniqueId}`}
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
            {
              formMessages.password &&
              <span className="help-block signup-error">
                <Components.Translation
                  defaultValue={formMessages.password}
                />
              </span>
            }
          </div>

          <div className={passwordClasses}>
            <Components.TextField
              i18nKeyLabel="accountsUI.confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              tabIndex="2"
              id={`confirmPassword-${uniqueId}`}
              value={this.state.confirmPassword}
              onChange={this.handleFieldChange}
            />
            {
              formMessages.confirmPassword &&
              <span className="help-block signup-error">
                <Components.Translation
                  defaultValue={formMessages.confirmPassword}
                />
              </span>
            }
          </div>

          <div className="col-sm-12">
            <label>
              <Components.Translation defaultValue="Create Account as"/>
            </label>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <input
                type="radio"
                name="role"
                value="customer"
                onChange={this.handleRoleChange}
                checked={this.state.selectedOption === "customer"}
              />
              <span className="radio-btn">Customer</span>
            </div>
            <div className="col-sm-6">
              <input
                type="radio"
                name="role"
                value="merchant"
                onChange={this.handleRoleChange}
                checked={this.state.selectedOption === "merchant"}
              />
              <span className="radio-btn">Vendor</span>
            </div>
          </div>

          {this.vendorDetails()}

          <h3 className="text-center">Terms and Conditions</h3>
          <div className="mt-2" id="terms-and-cond">
            <div style={{ width: "85%", margin: "0 auto", textAlign: "justify" }}>
              <h3>Introduction</h3>

              <p>
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website,
                Webiste Name accessible at Website.com.

                These Terms will be applied fully and affect to your use of this Website. By using this Website,
                you agreed to accept all terms and conditions written in here. You must not use this Website if you
                disagree with any of these Website Standard Terms and Conditions.

                Minors or people below 18 years old are not allowed to use this Website.
              </p>
              <p>
                Intellectual Property Rights
                Other than the content you own, under these Terms, Company Name and/or its
                licensors own all the intellectual property rights and materials contained in this Website.

                You are granted limited license only for purposes of viewing the material contained on this Website.
              </p>

              <h3>Restrictions</h3>
              <p>There are no restrictions on in here for as at this point in time</p>

              <h3>
                Your Content
              </h3>

              <p>
                In these Website Standard Terms and Conditions, “Your Content” shall mean any audio,
                video text, images or other material you choose to display on this Website. By displaying
                Your Content, you grant Company Name a non-exclusive, worldwide irrevocable, sub licensable
                license to use, reproduce, adapt, publish, translate and distribute it in any and all media.

                Your Content must be your own and must not be invading any third-party's rights. Company
                Name reserves the right to remove any of Your Content from this Website at any time without notice.
              </p>

              <h3>
                No warranties
              </h3>
              <p>
                This Website is provided “as is,” with all faults, and Company Name express no
                representations or warranties, of any kind related to this Website or the materials contained on
                this Website. Also, nothing contained on this Website shall be interpreted as advising you.
              </p>

              <h3>
                Limitation of liability
              </h3>
              <p>
                In no event shall Company Name, nor any of its officers, directors and employees,
                shall be held liable for anything arising out of or in any way connected with your use
                of this Website whether such liability is under contract.  Company Name, including its
                officers, directors and employees shall not be held liable for any indirect, consequential
                or special liability arising out of or in any way related to your use of this Website.
              </p>

              <h3>
                Indemnification
              </h3>
              <p>
                You hereby indemnify to the fullest extent Company Name from and against any
                and/or all liabilities, costs, demands, causes of action, damages and expenses
                arising in any way related to your breach of any of the provisions of these Terms.
              </p>

              <h3>
                Severability
              </h3>
              <p>
                If any provision of these Terms is found to be invalid under any applicable
                law, such provisions shall be deleted without affecting the remaining provisions herein.
              </p>

              <h3>
                Variation of Terms
              </h3>
              <p>
                Company Name is permitted to revise these Terms at any time as it sees fit,
                and by using this Website you are expected to review these Terms on a regular basis.
              </p>

              <h3>
                Entire Agreement
              </h3>
              <p>
                These Terms constitute the entire agreement between Company Name and you in
                relation to your use of this Website, and supersede all prior agreements and understandings.
              </p>

              <h3>
                Governing Law & Jurisdiction
              </h3>
              <p>
                These Terms will be governed by and interpreted in accordance with the laws of
                the State of Country, and you submit to the non-exclusive jurisdiction of the state
                and federal courts located in Country for the resolution of any disputes.
              </p>
              <p>
                These terms and conditions have been generated at Terms And Conditions Sample.com
              </p>
            </div>

          </div>

          <input
            type="checkbox"
            name="TCAgreed"
            className="mt-2"
            onChange={this.checkBoxChange}
          /> <strong>I agree to the above terms and conditions</strong>
          {
            formMessages.TCAgreed &&
            <span className="help-block signup-error">
              <Components.Translation
                defaultValue={formMessages.TCAgreed}
              />
            </span>
          }

          <div className="form-group mt-2">
            {this.renderSpinnerOnWait()}
          </div>
        </div>
      </form>
    );
  }

  render() {
    const emailClasses = classnames({
      "form-group": true,
      "form-group-email": true
    });

    const passwordClasses = classnames({
      "form-group": true,
      "form-group-password": true,
      "col-lg-6": true
    });
    return (
      <div>
        <div className="loginForm-title">
          <h2>
            <Components.Translation defaultValue="Create an Account" i18nKey="accountsUI.createAccount" />
          </h2>
        </div>

        {this.renderForm(emailClasses, passwordClasses)}

      </div>
    );
  }
}

registerComponent("SignUpForm", SignUpForm);

export default SignUpForm;
