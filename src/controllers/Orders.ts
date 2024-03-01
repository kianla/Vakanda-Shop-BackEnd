import { RequestHandler } from 'express';
import { Users } from '../models/Users';
import { Orders } from '../models/Orders';
require('dotenv').config();
const postgres = require('postgres');

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export const createOrder: RequestHandler = async(req, res, next) => {
  const create_date = (req.body as { create_date: Date }).create_date;
  const user_id = (req.body as { user_id: number }).user_id;
  let createDate: Date = new Date(create_date);  
  let registrationDate: Date = new Date(0);  
  const newOrder = new Orders(1,createDate,registrationDate,0,user_id);
  await sql`INSERT INTO order (create_date, user_id) VALUES (${newOrder.create_date}, ${newOrder.user_id})`;
  res.status(201).send(newOrder);
};

export const getOrder: RequestHandler = async(req, res, next) => {
  const id = +req.params.id;
  const order = await sql`SELECT * FROM order where id = ${id}`;
  if(order.count > 0) {
      res.send(order);
  } else {
      res.status(404).send({error:'The order is NOT Found!'});
  }
};

export const getOrders: RequestHandler = async(req, res, next) => {
  const orders = await sql`SELECT * FROM order`;
  res.send(orders);
};

export const updateOrder: RequestHandler<{ id: number }> = async(req, res, next) => {
  const id = +req.params.id;
  const order = await sql`SELECT * FROM order where id = ${id}`;
  if(order.count > 0) {
  const registration_date = (req.body as { registration_date: Date }).registration_date;
  const price = (req.body as { price: number }).price;
  await sql`UPDATE order SET registration_date = ${registration_date}  WHERE id = ${id}`;
  const user = await sql`UPDATE order SET price = ${price}  WHERE id = ${id} RETURNING *`;
  console.log(user);
  res.send(user);
  }
  else {
      res.status(404).send({error:'The user is NOT Found!'});
  }
};

