import { Template } from "meteor/templating";
import StaticPageContainer from "../../containers/staticPages";

Template.pagesOnNavbar.helpers({
  staticPages() {
    return {
      component: StaticPageContainer
    };
  }
});
