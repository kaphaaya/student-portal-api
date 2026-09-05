import 'dotenv/config';
import express from 'express';
import connectDB from './config/database.mjs';
import studentRoutes from './routes/studentRoutes.mjs';

const app = express();

app.use(express.json());
app.use('/students', studentRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('Student Portal API is running!');
});

app.post('/test', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
