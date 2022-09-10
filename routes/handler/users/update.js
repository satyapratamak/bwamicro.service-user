const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res) => {
    const schema = {

        
        name: 'string|empty:false',
        email : 'email|empty:false',
        // email: { type: "email", empty : false, optional : false  },
        password : 'string|min:6',
        profession : 'string|optional',
        avatar : 'string|optional',

        
    };
    
    const validate = v.validate(req.body, schema);

    if (validate.length){
        // Validation Error
        return res.status(400).json(
            {
                status : "error",
                message : validate,
            }
        );
    }

    const id = req.params.id;
    const user = await User.findByPk(id);

    if(!user){
        // User not found
        return res.status(404).json(
            {
                status : "error",
                message : "User not found",
            }
        );
    }

    const email = req.body.email;
    if (email){
        const checkEmail = await User.findOne(
            {where :{ email: email} });
        
        if (checkEmail && email !== user.mail){
            // Email already exists
            return res.status(409).json(
                {
                    status : "error",
                    message : "Email already exists",
                }
            ); 
        } 
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const {name, profession, avatar} = req.body;

    const updateProfile = await user.update({
        name : name,
        profession : profession,
        avatar : avatar,
        password : password,
        email : email,
    });

    if (updateProfile){
        return res.json(
            {
                status : "success",
                message : "User updated data successfully",
                data : {
                    id : user.id,
                    name : name,
                    email : email,
                }
            }
        );
    }
}