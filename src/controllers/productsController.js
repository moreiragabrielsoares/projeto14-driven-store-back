
import { db, objectId} from '../databases/mongodb.js';


export async function listProducts(req, res) {
    
    try {
        
        const products = await db.collection('products').find().toArray();
        res.status(200).send(products);
    
    } catch (error) {

        res.sendStatus(500);
    }

}

export async function listShopping(req, res) {
    try {
        const { authorization } = req.headers;
        console.log(authorization)
        const token = authorization?.replace('Bearer ', '');
        console.log(token)
            if(!token) {
                return res.sendStatus(401);
            }
        console.log("vamos buscar o token nas sessoões")
    
        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
        return res.sendStatus(401)
        }    
        console.log(session)
        //const teste = objectId(session.userId) //tentei valueOf, value e .str
        //console.log(teste)

        //preciso retornar apenas as compras do shoppingcart que pertencerem ao ID do usuário
        const shopping = await db.collection('shoppingcart').find({ userId: session.userId }).toArray();
        console.log(shopping)
        if (shopping.length === 0) {
           return res.status(422).send("Não encontramos compras nesse ID"); 
        }
        res.status(201).send(shopping); 
        return
        } 
    catch(erro) {
        console.log(erro)
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

export async function postShopping(req, res) {
    try{
        await db.collection('shoppingcart').insertOne(req.body) 
        res.sendStatus(201)
    }catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}

export async function deleteShopping(req, res) {
    try {
        console.log("vamos deletar")
        const { image } = req.params;
        console.log(image)
        //const shoppingColection = db.collection("shoppingcart");
		//await shoppingColection.deleteOne({ _id: new ObjectId(id) })
    }catch(erro) {
        console.log("deu ruim")
        res.sendStatus(422)
        return
    }
}