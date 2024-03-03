import { RequestHandler } from 'express';
import { Users } from '../models/Users';
import { Items } from '../models/Items';
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
export const createItem: RequestHandler = async(req, res, next) => {
  const name = (req.body as { name:string }).name;
  const discription = (req.body as { discription:string}).discription;
  const photo = (req.body as { photo: string }).photo;
  const item_count = (req.body as { item_count: number }).item_count;
  const price = (req.body as { price: number }).price;
  const group_id = (req.body as { group_id: number }).group_id;
  console.log(req);
  const newItem = new Items(1,name,discription,photo,item_count,price,group_id);
  console.log(newItem);
  await sql`INSERT INTO item (name, discription, photo, item_count, price, group_id) VALUES
   (${newItem.name}, ${newItem.discription}, ${newItem.photo}, ${newItem.item_count}, ${newItem.price}, ${newItem.group_id})`;
  res.status(201).send(newItem);
};

export const getItem: RequestHandler = async(req, res, next) => {
  const id = +req.params.id;
  const item = await sql`SELECT * FROM item where id = ${id}`;
  if(item.count > 0) {
      res.send(item);
  } else {
      res.status(404).send({error:'The item is NOT Found!'});
  }
};

export const getItems: RequestHandler = async(req, res, next) => {
  const groupId = req.query.groupId;
  const orderId = req.query.orderId;
  if (groupId !== null && groupId !== undefined) {
    const items = await sql`SELECT * FROM item WHERE item.group_id = ${groupId}`;   
    res.send(items);
  } else if (orderId !== null && orderId !== undefined) {
    const items = await sql`SELECT 
                            i.*, oi.id 
                            FROM 
                                "order" AS o
                            
                            INNER JOIN 
                                "order-item" AS oi ON o.id = oi.order_id
                            INNER JOIN 
                                "item" AS i ON oi.item_id = i.id
                            WHERE 
                                o.id = ${orderId}`;   
    res.send(items);
    console.log("t");
  }
   else {
    const items = await sql`SELECT * FROM item`;
    res.send(items);
  }
};

export const updateItem: RequestHandler<{ id: number }> = async(req, res, next) => {
  const id = +req.params.id;
  const item = await sql`SELECT * FROM item where id = ${id}`;
  if(item.count > 0) {
  const discription = (req.body as { discription:string}).discription;
  const photo = (req.body as { photo: string }).photo;
  const item_count = (req.body as { item_count: number }).item_count;
  const price = (req.body as { price: number }).price;

  await sql`UPDATE item SET discription = ${discription}  WHERE id = ${id}`;
  await sql`UPDATE item SET photo = ${photo}  WHERE id = ${id}`;
  await sql`UPDATE item SET item_count = ${item_count}  WHERE id = ${id}`;
  const item = await sql`UPDATE item SET price = ${price}  WHERE id = ${id} RETURNING *`;
  res.send(item);
  }
  else {
      res.status(404).send({error:'The item is NOT Found!'});
  }
};
