module.exports = {
  user: require("./user-model"),
  course: require("./course-model").default,
  resolve: {
    fallback: {
      url: false,
    },
  },
};
