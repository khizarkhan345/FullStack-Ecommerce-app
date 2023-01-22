const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { text } = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "ecommrce-db",
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM product;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/images", (req, res) => {
  db.query("SELECT * from productimages;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/cart", (req, res) => {
  db.query(
    "SELECT c.id as id, c.prodID as prodID, p.title as title, c.quantity as quantity, p.price as price from addcartproducts c, product p where c.prodID = p.id;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getOrders", (req, res) => {
  db.query(
    "Select o.custID as custID, o.prodID as prodID, c.name as cName, c.email as cEmail, c.phoneNO as cphoneNo, c.Street as cStreet, c.city as cCity, c.state as cState, c.zipCode as czipCode, o.orderDate as orderDate, p.title as title, o.quantity as quantity from product p, orderproducts o, customer c WHERE o.custID = c.custID AND o.prodID = p.id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/addToCart", (req, res) => {
  const id = req.body.id;
  const prodID = req.body.prodID;
  const quantity = req.body.quantity;
  db.query(
    "INSERT INTO addcartproducts (id, prodID, quantity) VALUES(?, ?, ?)",
    [id, prodID, quantity],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Record inserted Successfully!");
      }
    }
  );
});

app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  let testAccount = nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //console.log(transporter);

  let data = {
    from: email,
    to: process.env.EMAIL,
    subject: `New Message from ${name}`,
    text: "Hello World",
    html: `<h2>${message}</h2>`,
  };

  transporter.sendMail(data, (err, response) => {
    if (err) {
      console.log("error occurred", err);
      return res.json({
        msg: "Unable to send message",
      });
    }

    return res.json({
      message: "Email has been to client. Kindly, verify it.",
    });
  });
});

app.get("/getCustomer/:email", (req, res) => {
  const customerEmail = req.params.email;
  console.log(customerEmail);
  db.query(
    "SELECT * FROM customer WHERE email=?;",
    customerEmail,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/addCustomer", (req, res) => {
  const custID = req.body.custID;
  const name = req.body.name;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;

  console.log("Customer Phone No", phoneNo);

  db.query(
    "INSERT INTO customer (custID, name, email, phoneNO, Street, city, state, zipCode) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    [custID, name, email, phoneNo, street, city, state, zipcode]
  ),
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("New Customer Added");
      }
    };
});

app.post("/order", (req, res) => {
  const prodID = req.body.prodID;
  const custID = req.body.custID;
  const quantity = req.body.quantity;
  const orderDate = req.body.orderDate;

  db.query(
    "INSERT INTO orderproducts (custID, prodID, quantity, orderDate) VALUES(?, ?, ?, ?)",
    [custID, prodID, quantity, orderDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    }
  );
});

app.delete("/deleteCart/:id", (req, res) => {
  const cartid = req.params.id;
  console.log("Deleted product ID:", cartid);
  db.query("DELETE FROM addcartproducts WHERE id=?", cartid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  });
});

app.put("/editStock/:id", (req, res) => {
  const productID = req.params.id;
  const newStock = req.body.newStock;

  console.log("New Product Stock", newStock);
  db.query(
    "UPDATE product SET stock=? WHERE id=?",
    [newStock, productID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    }
  );
});

app.put("/editCart/:id", (req, res) => {
  const cartid = req.params.id;
  const newQuantity = req.body.newQuantity;

  console.log("New Quantity", newQuantity);
  db.query(
    "UPDATE addcartproducts SET quantity=? WHERE id=?",
    [newQuantity, cartid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    }
  );
});
app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
