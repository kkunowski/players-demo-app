import express from 'express';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});