'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('url')
      .service('myService')
      .getWelcomeMessage();
  },
});
