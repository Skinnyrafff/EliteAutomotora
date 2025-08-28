module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/sell-requests',
      handler: 'api::sell-request.sell-request.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};