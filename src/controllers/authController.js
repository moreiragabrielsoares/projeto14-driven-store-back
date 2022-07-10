import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from '../databases/mongodb.js';
import joi from 'joi';
import jwt from 'jsonwebtoken';

export async function signUpUser(req, res) {
  
    const user = req.body;

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).required(),
        confirmPassword: joi.string().required()
    });

    const { error } = userSchema.validate(user);
    if (error) {
        res.status(401).send('Campos inválidos');
        return;
    }

    if (user.password !== user.confirmPassword) {
        res.status(401).send('Senhas não conferem');
        return;
    }

    try {

        const userDB = await db.collection('users').findOne({ email: user.email });
        if (userDB) {
            res.status(409).send('E-mail já cadastrado');
            return;
        }

        const encryptedPassword = bcrypt.hashSync(user.password, 10);
        delete user.confirmPassword;

        await db.collection('users').insertOne({ ...user, password: encryptedPassword });
        res.status(201).send('Usuário criado com sucesso');

    } catch (error) {
        res.sendStatus(500);
    }

    
}

export async function loginUser(req, res) {
    
    const user = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = userSchema.validate(user);

    if (error) {
        res.status(401).send('Campos inválidos');
        return;
    }

    try {

        const userDB = await db.collection('users').findOne({ email: user.email });

        if (userDB && bcrypt.compareSync(user.password, userDB.password)) {
           
            const chave = process.env.JWT_SECRET;
            const configuracoes = { expiresIn: 60*60*24*30 }
            const token = jwt.sign({ name: userDB.name }, chave, configuracoes); 

            //const token = uuid();

            let userFirstName = userDB.name;
            userFirstName = userFirstName.trim();
            let spacePosition = userFirstName.indexOf(" ");
            if (spacePosition > -1) {
                userFirstName = userFirstName.slice(0 , spacePosition);
            }
            
            await db.collection('sessions').insertOne({
            token,
            email: user.email
            });

            res.status(201).send({ token: token, name: userFirstName , email: user.email});
            return;

        } else {
            res.status(401).send('Senha ou email incorretos!');
            return;
        }

    } catch (error) {
        return res.sendStatus(500);
    }

}