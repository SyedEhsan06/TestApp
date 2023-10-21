const express = require('express');
const app = express();
const port = 8000;
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');
const quesRoutes = require('./routes/ques');
const marksRoutes = require('./routes/marks');

const cors = require('cors')
app.use(cors())
connectToMongo();

app.use(express.json());
//
// 
//
app.use('/api/auth', authRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/ques',quesRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
