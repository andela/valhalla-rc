import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "signup",
  name: "signup-page",
  icon: "fa fa-signup",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/signup",
    name: "signup",
    template: "signupForm",
    workflow: "coreWorkflow"
  }]
});
