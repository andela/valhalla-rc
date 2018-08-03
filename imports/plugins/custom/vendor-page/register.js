import { Reaction } from "/server/api";

Reaction.registerPackage({
  // Name of the theme for presentation purposes
  label: "Homepage-theme",

  // Name of your theme to uniquely identify it from other themes
  name: "VendorPage",

  // Icon for toolbars
  icon: "fa fa-bars",

  // Auto-enable plugin, sets enabled: true in database
  autoEnable: true,

  // Settings for plugin
  settings: {},

  // Routes and other registry items related to layout
  registry: [
    {
      route: "/vendors",
      name: "VendorPage",
      template: "VendorPage",
      workflow: "coreWorkflow"
    },
    {
      route: "/vendors/:vendorName",
      name: "vendorDetails",
      template: "vendorDetails",
      workflow: "coreWorkflow"
    }
  ]
});
