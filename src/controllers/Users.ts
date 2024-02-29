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
  const Username = (req.body.username as { text: string }).text;
  const email = (req.body.username as { text: string }).text;
  const address = (req.body.username as { text: string }).text;
  const join_date = (req.body.username as { text: Date }).text;
  const password = (req.body.username as { text: string }).text;
  const type = (req.body.username as { text: string }).text;

  const newUser = new Users(1,Username,email,address,join_date,password,type);
  await sql`INSERT INTO shopUser (userName, email, address, join_date, password, type)
  VALUES (${Username}, ${email}, ${address}, ${join_date}, ${password}, ${type});
  `;
  res.status(204).json({ message: 'Created the User.', createdTodo: newUser });
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

export const updateUser: RequestHandler<{ id: string }> = async(req, res, next) => {
  const id = +req.params.id;

  const user = await sql`SELECT * FROM shopUser where id = ${id}`;
  if(user.count > 0) {
  const address = (req.body.username as { text: string }).text;
  const password = (req.body.username as { text: string }).text;
  await sql`UPDATE shopUser SET address = ${address}  WHERE id = ${id}`;
  const user = await sql`UPDATE shopUser SET password = ${password}  WHERE id = ${id} RETURNING *`;
  res.send(user);
  }
  else {
      res.status(404).send({error:'The user is NOT Found!'});
  }
};

export const deleteUser: RequestHandler = async(req, res, next) => {
  const id = +req.params.id;
    const user = await sql`SELECT * FROM shopUser where id = ${id}`;
    if(user.count > 0) {
    const  user = await sql`DELETE FROM shopUser WHERE id = ${id} RETURNING *`;
    res.send(user);
    }
    else {
        res.status(404).send({error:'The user is NOT Found!'});
    }
};
