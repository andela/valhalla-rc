import LandingPage from "../components/landingPage";
import { Template } from "meteor/templating";

Template.Homepage.helpers({
  Home() {
    return {
      component: LandingPage
    };
  }
});
