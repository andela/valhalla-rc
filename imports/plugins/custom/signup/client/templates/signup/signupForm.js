import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.signupForm.helpers({
  component() {
    return {
      component: Components.SignUpForm
    };
  }
});
