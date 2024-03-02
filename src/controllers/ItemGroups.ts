import { RequestHandler } from 'express';
import { Users } from '../models/Users';
import { ItemGroup } from '../models/ItemGroup';
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
export const createItemGroup: RequestHandler = async(req, res, next) => {
  const name = (req.body as { name: string }).name;
  const newItemGroup = new ItemGroup(1,name);
  await sql`INSERT INTO itemgroup (name) VALUES (${newItemGroup.name})`;
  res.status(201).send(newItemGroup);
};

export const getItemGroup: RequestHandler = async(req, res, next) => {
  const id = +req.params.id;
  const ItemGroup = await sql`SELECT * FROM itemgroup where id = ${id}`;
  if(ItemGroup.count > 0) {
      res.send(ItemGroup);
  } else {
      res.status(404).send({error:'The itemgroup is NOT Found!'});
  }
};

export const getItemGroups: RequestHandler = async(req, res, next) => {
  const ItemGroup = await sql`SELECT * FROM itemgroup`;
  res.send(ItemGroup);
};

export const updateItemGroup: RequestHandler<{ id: number }> = async(req, res, next) => {
  const id = +req.params.id;
  const ItemGroup = await sql`SELECT * FROM itemgroup where id = ${id}`;
  if(ItemGroup.count > 0) {
  const name = (req.body as { name: string }).name;
  const ItemGroup = await sql`UPDATE itemgroup SET name = ${name}  WHERE id = ${id} RETURNING *`;
  res.send(ItemGroup);
  }
  else {
      res.status(404).send({error:'The itemgroup is NOT Found!'});
  }
};
