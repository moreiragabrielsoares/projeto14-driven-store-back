import { db } from '../databases/mongodb.js';
import jwt from 'jsonwebtoken';

async function validateUser(req, res, next){
    try{
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
       
        const chaveSecreta = process.env.JWT_SECRET;
        const {name} = jwt.verify(token,chaveSecreta)
        
        console.log(token)
            if(!token || !name) {
                return res.sendStatus(400);
            }
            console.log("autenticado")
            console.log("vamos buscar o token nas sessoões")

        const session = await db.collection('sessions').findOne({ token });
        res.locals.session = session;
        next();
        if (!session) {
        return res.sendStatus(401)
        } 
    } catch(erro) {
        return res.sendStatus(500);
    }
     
   
    
}

export default validateUser;