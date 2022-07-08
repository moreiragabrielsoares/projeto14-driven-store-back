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

export async function getProducts(req, res) {
    
    const session = res.locals.session;
   
    try {

        const products = await db.collection('shoppingcart').find({userId: session.userId}).toArray();

        res.send(products);
    
    } catch (error) {

        res.sendStatus(500);
    }

}

export async function deleteOneShopping(req, res) {
    try {
        console.log("vamos deletar")
        const { produtoId } = req.params;
        console.log(produtoId)
        const shoppingColection = db.collection("shoppingcart");
		await shoppingColection.deleteOne({ produtoId: produtoId })
        return res.status(201).send("deletamos");
    }catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

export async function deleteManyShopping(req, res) {
    try {
        console.log("vamos deletar vários")
        const { userId } = req.params;
        console.log(userId)
        const shoppingColection = db.collection("shoppingcart");
		await shoppingColection.deleteMany({ userId: userId })
       return res.status(201).send("deletamos");
    }catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

