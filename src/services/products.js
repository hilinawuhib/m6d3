import { Router } from "express";
import pool from "../utils/db/connect.js";
const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM products;`);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.get("/product_id", async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM products WHERE product_id=$1;`,
    [req.params.product_id]);
    if (result.row[0]) {
        res.send(result.rows);
       
    } else {
        res.status(404).send ({message:"no such product."})
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.post("/", async (req, res, next) => {
    try {
      const result = await pool.query(
        `INSERT INTO products(product_name,product_description,product_brand,product_price,product_category) VALUES($1,$2,$3,$4,$5) RETURNING *;`,
        [req.body.product_name, req.body.product_description, req.body.product_brand, req.body.product_price, req.body.product_category]
      );
      res.send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
productsRouter.put("/:product_id",async(req,res,next)=>{
    try {
        const result =await pool.query(`UPDATE products SET  product_name=$1,product_description=$2  product_brand =$3 product_price=$4 product_category=$5 WHERE product_id=$6 RETURNING * ;`,
        [req.body.product_name, req.body.product_description, req.body.product_brand, req.body.product_price, req.body.product_category, req.params.product_id]
        );
        res.send(result.rows[0]);
        
    } catch (error) {
        res.status(500).send({ message: error.message });  
    }
});
 productsRouter.delete("/:product_id", async (req, res, next)=>{
     try { await pool.query(`DELETE FROM authors WHERE product_id=$1;`,
    [req.params.product_id, ] )
    res.status(204).send();
} catch (error) {
  res.status(500).send({ message: error.message });
}
});
export default productsRouter
