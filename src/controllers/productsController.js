import { db } from '../databases/mongodb.js';


export async function listProducts(req, res) {
    
    try {
        
        const products = await db.collection('products').find().toArray();
        res.status(200).send(products);
    
    } catch (error) {

        res.sendStatus(500);
    }

}