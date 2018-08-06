import { Reaction } from "/server/api";
Reaction.registerPackage({
  label: "Static-Page-View",
  name: "static-pages-view",
  autoEnable: true,
  registry: [
    {
      route: "/pages/:pageAddress",
      name: "pages",
      template: "staticPageView"
    }
  ]
});
