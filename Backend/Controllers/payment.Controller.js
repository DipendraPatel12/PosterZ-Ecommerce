const paypal = require("../Config/paypal");
const Order = require("../Models/order.Model");
const Product = require("../Models/product.Model");
const createPayment = async (req, res) => {
  const { Products, address, location, userId } = req.body;

  req.session.orderData = {
    Products,
    address,
    location,
    userId,
  };

  const total = Products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      // Updated URLs to redirect to frontend routes
      return_url: "http://localhost:5173/payment-success", // Frontend URL
      cancel_url: "http://localhost:5173/payment-cancel", // Frontend URL
    },
    transactions: [
      {
        item_list: {
          items: Products.map((item) => ({
            name: item.name,
            sku: item.ProductId,
            price: item.price.toString(),
            currency: "USD",
            quantity: item.quantity,
          })),
        },
        amount: {
          currency: "USD",
          total: total.toFixed(2),
        },
        description: "Order payment via PayPal",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating payment" });
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      res.json({ approvalUrl });
    }
  });
};

// New API endpoint to handle payment execution
const executePayment = async (req, res) => {
  const { payerId, paymentId } = req.body;

  const execute_payment_json = { payer_id: payerId };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.error(error.response);
        return res.status(400).json({
          success: false,
          message: "Payment execution failed",
          error: error.response || error,
        });
      }

      const orderData = req.session.orderData;

      if (!orderData) {
        return res.status(400).json({
          success: false,
          message: "Order data missing from session",
        });
      }

      try {
        const { Products, address, location, userId } = orderData;

        const updatedProducts = Products.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        }));

        const newOrder = new Order({
          userId,
          Products: updatedProducts,
          address,
          location: {
            type: location.type,
            coordinates: location.coordinates,
          },
        });

        await newOrder.save();

        // Update product stocks
        for (let orderedProduct of Products) {
          const product = await Product.findById(orderedProduct.ProductId);
          if (!product) {
            return res.status(404).json({
              success: false,
              message: `Product not found: ${orderedProduct.ProductId}`,
            });
          }

          if (product.stock < orderedProduct.quantity) {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for ${product.name}`,
            });
          }

          product.stock -= orderedProduct.quantity;
          await product.save();
        }

        req.session.orderData = null;

        res.status(201).json({
          success: true,
          message: "Order successfully created and payment completed!",
          order: newOrder,
          paymentDetails: payment,
        });
      } catch (err) {
        console.error("Error saving order after payment:", err);
        res.status(500).json({
          success: false,
          message: "Payment succeeded, but order creation failed.",
          error: err.message,
        });
      }
    }
  );
};

const paymentCancel = (req, res) => {
  req.session.orderData = null;
  res.json({
    success: false,
    message: "Payment was cancelled. Order not created.",
  });
};

module.exports = {
  createPayment,
  executePayment, // New export
  paymentCancel,
};
