import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "Homepage",
  layoutHeader: "NavBar",
  layoutFooter: ""
});
