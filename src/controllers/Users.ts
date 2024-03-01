import { RequestHandler } from 'express';
import { Users } from '../models/Users';
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

export const createUser: RequestHandler = async(req, res, next) => {
  const Username = (req.body as { userName:string }).userName;
  const email = (req.body as { email:string}).email;
  const address = (req.body as { address: string }).address;
  const join_date = (req.body as { join_date: string }).join_date;
  const password = (req.body as { password: string }).password;
  const type = (req.body as { type: string }).type;
  let date: Date = new Date(join_date);  
  const newUser = new Users(1,Username,email,address,date,password,type);
  await sql`INSERT INTO shopUser (userName, email, address, join_date, password, type) VALUES (${newUser.username}, ${newUser.email}, ${newUser.address}, ${newUser.join_date}, ${newUser.password}, ${newUser.type})`;
  res.status(201).send(newUser);
};

export const getUser: RequestHandler = async(req, res, next) => {
  const id = +req.params.id;
  const user = await sql`SELECT * FROM shopUser where id = ${id}`;
  if(user.count > 0) {
      res.send(user);
  } else {
      res.status(404).send({error:'The user is NOT Found!'});
  }
};

export const getUsers: RequestHandler = async(req, res, next) => {
  const users = await sql`SELECT * FROM shopUser`;
  res.send(users);
};

export const updateUser: RequestHandler<{ id: number }> = async(req, res, next) => {
  const id = +req.params.id;
  const user = await sql`SELECT * FROM shopUser where id = ${id}`;
  if(user.count > 0) {
  const address = (req.body as { address: string }).address;
  const password = (req.body as { password: string }).password;
  await sql`UPDATE shopUser SET address = ${address}  WHERE id = ${id}`;
  const user = await sql`UPDATE shopUser SET password = ${password}  WHERE id = ${id} RETURNING *`;
  console.log(user);
  res.send(user);
  }
  else {
      res.status(404).send({error:'The user is NOT Found!'});
  }
};


