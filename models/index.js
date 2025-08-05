module.exports = {
  user: require("./user-model"),
  course: require("./course-model"),
  resolve: {
    fallback: {
      url: false,
    },
  },
};

