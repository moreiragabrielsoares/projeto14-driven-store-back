import { db } from '../databases/mongodb.js';
import joi from 'joi';


export async function registerProduct(req, res) {
    
    const productCart = req.body;

    const productCartSchema = joi.object({
        userId: joi.string().required(),
        productId: joi.string().required(),
        productName: joi.string().required(),
        productPrice: joi.number().required(),
        productImg: joi.string().required()
    });

    const { error } = productCartSchema.validate(productCart);
    if (error) {
        res.status(401).send('Campos inválidos');
        return;
    }
    
    try {

        await db.collection('shoppingcart').insertOne(productCart);

        res.status(200).send('Cadastro feito!');
    
    } catch (error) {

        res.sendStatus(500);
    }

}