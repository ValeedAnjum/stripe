const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.SECRECT_KEY);
const app = express();
const PORT = 5000 || process.env.PORT;
//middleware
app.use(express.json());
app.use(cors());

//routes

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  const idempontencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "USD",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

//listen

app.listen(PORT, () => console.log(`server is up at ${PORT}`));
