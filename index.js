const express=require('express');
const userRouter=require('./routes/userRouter');
const app = express();
app.use(express.json());
app.use('/',userRouter);
app.listen(3000, () => {
    console.log("server is running on port no 3000");
  })