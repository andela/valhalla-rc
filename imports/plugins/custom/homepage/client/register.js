import { Reaction } from "/server/api";

Reaction.registerPackage({
  // Name of the theme for presentation purposes
  label: "Homepage-theme",

  // Name of your theme to uniquely identify it from other themes
  name: "Homepage",

  // Icon for toolbars
  icon: "fa fa-bars",

  // Auto-enable plugin, sets enabled: true in database
  autoEnable: true,

  // Settings for plugin
  settings: {},

  // Routes and other registry items related to layout
  registry: []
});
