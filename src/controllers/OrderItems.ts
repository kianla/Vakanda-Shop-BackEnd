import { RequestHandler } from 'express';
import { Users } from '../models/Users';
import { Orders } from '../models/Orders';
import { OrderItem } from '../models/OrderItem';
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

export const createOrderItems: RequestHandler = async(req, res, next) => {
  const item_id = (req.body as { item_id: number }).item_id;
  const order_id = (req.body as { order_id: number }).order_id;
  const newOrderitem = new OrderItem(1,item_id,order_id);
  await sql`INSERT INTO "order-item" (item_id, order_id) VALUES (${newOrderitem.item_id}, ${newOrderitem.order_id})`;
  res.status(201).send(newOrderitem);
};

export const deleteOrderItem: RequestHandler = async(req, res, next) => {
  const id = +req.params.id;
  await sql`DELETE FROM "order-item" OI WHERE OI.id = ${id}`;
  res.status(201).send();
};









