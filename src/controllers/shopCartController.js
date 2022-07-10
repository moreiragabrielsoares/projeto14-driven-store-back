import { db } from '../databases/mongodb.js';
import joi from 'joi';


export async function registerProduct(req, res) {
    
    const productCart = req.body;

    const productCartSchema = joi.object({
        email: joi.string().email().required(),
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

        return res.sendStatus(500);
    }

}

export async function getProducts(req, res) {
    
    const session = res.locals.session;
   
    try {

        const products = await db.collection('shoppingcart').find({email: session.email}).toArray();

       return res.send(products);
    
    } catch (error) {

        res.sendStatus(500);
    }

}

export async function deleteOneShopping(req, res) {
    try {
        console.log("vamos deletar")
        const { productId } = req.params;
        console.log(productId)
        const shoppingColection = db.collection("shoppingcart");
		await shoppingColection.deleteOne({ productId: productId })
        return res.status(201).send("deletamos");
    }catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

export async function postOrdersmade(req, res) {
    const request = req.body;

    const requestSchema = joi.object({
        qtyCartItems: joi.number().required(),
        balance: joi.number().required(),
        adress: joi.string().required(),
        payment: joi.string().required(),
        productIds: joi.array().required(),
        email: joi.string().email().required()
    });

    const { error } = requestSchema.validate(request);
    if (error) {
        res.status(401).send('Campos inválidos');
        return;
    }
    
    try {

        await db.collection('ordersmade').insertOne(request);

        const shoppingColection = db.collection("shoppingcart");
		await shoppingColection.deleteMany({ email: request.email })
        console.log("limpamos o carrinho do usuário")
        return res.status(200).send('Pedido realizado!');
    
    } catch (error) {

        return res.sendStatus(500);
    }
}
