const express = require("express"); // import express framework
const path = require("path");
const app = express();
const hbs = require("hbs"); //importing HandelBars
require("./db/conn");
const Register = require("./models/registers"); //we notify and connect our registers database with the project
const port = process.env.PORT || 9000;
// console.log(path.join(__dirname, "../public"));

const static_path = path.join(__dirname, "../public"); //paths of the given folder to connect them
const template_path = path.join(__dirname, "../templates/views"); //paths of the given folder to connect them
const partials_path = path.join(__dirname, "../templates/partials"); //paths of the given folder to connect them

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.static("images"));
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  // path name for different pages
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
  // , { image: images / profile.jpg }
});
// app.get("/static", (req, res) => {
//   res.render("profile");
// });
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    console.log(password);
    if (password == cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: password,
        confirmpassword: cpassword,
      });
      const registered = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("passwords are not matching");
    }
  } catch (error) {
    //  console.log(error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
