'use Strict'
const User = require('./user.model');
const { validateData, encrypt , checkPassword } = require('../utils/validate')
const { createToken } = require ('../services/jwt')

//DEFAULT ADMIN

exports.defaultAdmin = async()=>{
    try {
        let data = {
            name: 'Kevin Vaso',
            surname: 'Illem',
            username: 'allvaso',
            password: '123',
            email: 'kevinvaso@gmail.com',
            phone: '58274837',
            role: 'ADMIN'
        }


        let params = {
            password: data.password,
        }

        let validate = validateData(params)
        if(validate) return res.status(400).send(validate)

        let ExistUser = await User.findOne({name: 'Kevin Vaso'})
        if(ExistUser) return console.log('Admin already Engaged')
        data.password = await encrypt(data.password)
        let defaultRich = new User(data)
        await defaultRich.save()

        return console.log(`Admin ${defaultRich} engaged`)
    } catch (err) {
        console.error(err)
        return err
        
    }
}

//WORKER

exports.register = async(req,res)=>{
   try {
    let data = req.body;
    let params = {
        password: data.password
    }
    let validate = validateData(params);
    if(validate) return res.status(400).send(validate);
    data.role = 'EMPLOYEE'
    data.password = await encrypt(data.password)

    let user = new User(data);
    await user.save();
    return res.send({message: 'Account created succesfully'})
    
   } catch (err) {
    console.error(err)
    return res.status(500).send({message: 'CRITICAL HIT! at "Register Worker"'})
    
   }

}

//FIXED!
exports.login = async(req, res)=>{
    try{
    
        let data = req.body;
        let credentials = { 
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials);
        if(msg) return res.status(400).send(msg)

        let user = await User.findOne({username: data.username});

        if(user && await checkPassword(data.password, user.password)) {
            let userLogged = {
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await createToken(user)
            return res.send({message: 'User logged sucessfully', token, userLogged});
        }
        return res.status(401).send({message: 'Invalid credentials'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error, not logged'});
    }
}

exports.update = async(req,res)=>{
    try {

        let data = req.body;
        if(data.password || Object.entries(data).length === 0 || data.role)return res.status(400).send({message: 'Somethings cannot be updated (Check the manual for the Instructions!)'});
            let userUpdated = await User.findOneAndUpdate(
                {_id: req.user},
                data,
                {new: true}

            )
            if(!userUpdated) return res.status(404).send({message: 'User not found Nor Updated ヅ'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'CRITICAL HIT! at "update"', err: `Username ${err.keyValue.username} its already taken!`})
        
    }
    
}

exports.delete = async(req,res)=>{
    try {
   
        let userDeleted = await User.findOneAndDelete({id: req.user});
        if(!userDeleted) return res,send({message: 'Account not found nor deleted'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'CRITICAL HIT! at "Deleting"'})
        
    }
    
}



//ADMIN EXCLUSIVE 
exports.save = async(req, res)=>{
    try {
        let data = req.body;
        let params = {
            password: data.password
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
        data.password = await encrypt(data.password)
    
        let user = new User(data);
        if(data.role === 'ADMIN' || data.role === 'admin'){
          
            return res.status(401).send({message: 'CRITICAL HIT! Dont save ADMINS >:C'})
        }
        await user.save();
        return res.send({message: 'Account created succesfully'})
        
        
       } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'CRITICAL HIT! at "Saving Worker"'})
        
       }
}

//ADMIN EXCLUSIVE (Probably Worker too)

exports.getUser = async(req,res)=>{
    try {
        let user = await User.find().populate();
        return res.send({user});

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'CRITICAL HIT! at "Getting"'})
        
    }


}


exports.getTheUser = async(req,res)=>{
    try {
        let userId = req.params.id;
        let user = await User.findOne({_id: userId}).populate();
        if(!user) return res.status(404).send({message: 'User not Found'})
        return res.send({message: 'user found!',user})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'CRITICAL HIT! at "Getting ONE user"'});
    }
}



exports.Search = async(req,res)=>{
    try {
        let params = {
            name: req.body.name
        }
        let validate = validateData(params)
        if(validate) return res.status(400).send(validate);
        let user = await User.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        }).populate(data)
        return res.send({user})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'CRITICAL HIT! at "Searching"'})
    }
}

