import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/products.js';
import { isAuth, isAdmin } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find().populate('user', 'name');
        res.send(orders)
    })
)

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const newOrder = new Order({
            orderItme: req.body.orderItems.map(x => ({ ...x, product: x._id})),
            shippingAddress: req.body.shippingAddress,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })

        const order = await newOrder.save();
        res.status(201).send({message: 'New Order Created', order})
    })
)

orderRouter.get(
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalPrice' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders, dailyOrders, productCategories });
    })
  );

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const orders = await Order.find({ user: req.user._id})
        res.send(orders)
    })
)

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order)
        } else {
            res.status(401).send({ message: 'Order Not Found'})
        }
    })
)

orderRouter.put(
    '/:id/deliver',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id)
        if (order ) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            res.send({ message: 'Order has been Delivered'})
        } else {
            res.status(401).send({message: 'Order Not Found'})
        }
    })
)

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id)
        if(order) {
            await order.remove()
            res.send({ message: 'Order has been Removed'})
        } else {
            res.status(401).send({ message: 'Order Not Found'})
        }
    })
)

export default orderRouter