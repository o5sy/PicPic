import { Router } from "express";

const router = Router();

router.use("/test", (req, res) => {
  res.send("test!!");
});

export default router;
