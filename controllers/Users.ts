import { RequestHandler } from 'express';
import { Users } from '../models/Users';
import { sql } from '../src/app';

export const createUser: RequestHandler = (req, res, next) => {
  const Username = (req.body.username as { text: string }).text;
  const email = (req.body.username as { text: string }).text;
  const address = (req.body.username as { text: string }).text;
  const join_date = (req.body.username as { text: Date }).text;
  const password = (req.body.username as { text: string }).text;
  const type = (req.body.username as { text: string }).text;
   
  const newUser = new Users(Math.random(),Username,email,address,join_date,password,type);

  res.status(201).json({ message: 'Created the User.', createdTodo: newUser });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted!' });
};
