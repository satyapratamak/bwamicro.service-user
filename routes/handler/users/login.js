const bcrypt = require('bcrypt');
const {User} = require('../../../models');

const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res) => {
    const schema = {        
        email : 'email|empty:false',
        password : 'string|min:6',        
    };
    
    const validate = v.validate(req.body, schema); // validate user input

    if (validate.length){
        // user inputs do not pass validation
        return res.status(400).json(
            {
                status : "error",
                message : validate,
            }
        ); 
    }else{
        // user input pass validation

        // check email already exists not 
        const user = await User.findOne({
            where : {email : req.body.email,},
        });

        if (!user){
            // Email has not been registered
            return res.status(404).json({
                status : "error",
                message : "User not found",
            });
        }else {
            // Email has been registred.

            // Check the password matched or not.
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if(!isValidPassword) {
                // Password not matched
                return res.status(404).json({
                    status : "error",
                    message : "Password not matched",
                });
            }else{
                return res.status(200).json({
                    status : "success",
                    message : "Login successful",
                    data : {
                        id : user.id,
                        name : user.name,
                        email : user.email,
                        role : user.role,
                        avatar : user.avatar,
                        profession : user.profession,
                    }
                });
            }


        }
    }


}
