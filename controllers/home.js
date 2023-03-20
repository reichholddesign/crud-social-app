module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  test: (req, res) => {
    res.json("hello REACT!");
  },
};
