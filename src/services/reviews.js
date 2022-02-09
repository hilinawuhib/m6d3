import { Router } from "express";
import pool from "../utils/db/connect.js";
const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query( `SELECT * FROM reviews JOIN products ON reviews.product_id=products.product_id;`);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewsRouter.get("/review_id", async (req, res, next) => {
  try {
    const result = await pool.query( `SELECT * FROM reviews JOIN products ON reviews.product_id=products.product_id WHERE review_id=$1;`,
    [req.params.review_id]);
    if (result.row[0]) {
        res.send(result.rows);
       
    } else {
        res.status(404).send ({message:"no such review."})
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
reviewsRouter.post("/", async (req, res, next) => {
    try {
      const result = await pool.query(
        `INSERT INTO reviews(comments,rate,product_id) VALUES($1,$2,$3) RETURNING *;`,
        [req.body.comments, req.body.rate, req.body.product_id]
      );
      res.send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
reviewsRouter.put("/:review_id",async(req,res,next)=>{
    try {
        const result =await pool.query(`UPDATE reviews SET  comments=$1,rate=$2  WHERE review_id=$3 RETURNING * ;`,
        [req.body.comments, req.body.rate, req.params.review_id]
        );
        res.send(result.rows[0]);
        
    } catch (error) {
        res.status(500).send({ message: error.message });  
    }
});
 reviewsRouter.delete("/:review_id", async (req, res, next)=>{
     try { await pool.query(`DELETE FROM reviews WHERE review_id=$1;`,
    [req.params.review_id, ] )
    res.status(204).send();
} catch (error) {
  res.status(500).send({ message: error.message });
}
});
export default reviewsRouter;