import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import userRoutes from './routes/Users';
import orderRoutes from './routes/Orders';

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/Users', userRoutes);
app.use('/Orders', orderRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);





