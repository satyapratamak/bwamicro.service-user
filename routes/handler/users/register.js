const bcrypt = require('bcrypt');

const {User} = require('../../../models');

const Validator = require('fastest-validator');
const v = new Validator();



// npm install fastest-validator --save
module.exports = async (req, res) => {
   
    // Schema for every input that will be validated
    const schema = {
        name: 'string|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6',
        profession : 'string|optional',

        
    }
    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(
            {
                status : "Error",
                message : validate,
            }
        );
    }

    // Find existing Users
    const user = await User.findOne({
        where : {email : req.body.email}
    });

    if(user){
        // Email already exists
        return res.status(409).json(
            {
                status : "Error",
                message : "Email already exists",
            }
        );
    }else{

        const password = await bcrypt.hash(req.body.password, 10);
        const data = {
            password,
            email : req.body.email,
            name : req.body.name, 
            profession : req.body.profession,
            role : "student"
        };

        const createUser = await User.create(data);

        return res.status(200).json({
            status : "Success",
            message : "User has been added successfully",
            data : {
                id : createUser.id,
                email : createUser.email,
            }
        });
    }
        // Email does not exist
    

        
    

    
}

