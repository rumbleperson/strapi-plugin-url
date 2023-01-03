"use strict";

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "url",
    plugin: "url",
    type: "string",
  });
};
