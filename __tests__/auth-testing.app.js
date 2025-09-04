import express from "express";
import cors from "cors";
import userRouter from "../routers/user.router";
const testApp = express();

testApp.use(cors());
testApp.use(express.json());

testApp.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  
 
  if (!authHeader) {
    return res.status(302).json({ error: 'Redirect to login' });
  }
  
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token format' });
  }
  
  const token = authHeader.substring(7);

  if (token === 'totally.invalid.token' || token === 'invalid_token_12345') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (token === 'non_existent_user_123') {
    return res.status(404).json({ error: 'User not found' });
  }
  
  req.auth = { userId: token };
  next();
});

testApp.use("/api", userRouter);

export default testApp;