import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import userRoutes from './routes/Users';
import orderRoutes from './routes/Orders';
import itemGroupRoutes from './routes/ItemGroups';
import itemRoutes from './routes/Items';
import orderItemsRoutes from './routes/OrderItems';


const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.use('/Users', userRoutes);
app.use('/Orders', orderRoutes);
app.use('/ItemGroups', itemGroupRoutes);
app.use('/Items', itemRoutes);
app.use('/OrderItems', orderItemsRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);





