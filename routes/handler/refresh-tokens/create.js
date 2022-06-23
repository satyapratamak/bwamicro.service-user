const {
    User,
    RefreshToken,
} = require('../../../models');

const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const refreshToken = req.body.refresh_tokens;

    const schema = {
        refresh_tokens : "string",
        user_id : "number",
    }

    const validate = v.validate(req.body, schema);

    if (validate.length){
        // Error validation
        return res.status(400).json({
            status : 'Error',
            message : validate,
        });
    }

    const user = await User.findByPk(userId);

    if (!user){
        // User not found
        return res.status(404).json({
            status : 'Error',
            message : 'User not found',
        });
    }

    const createdRefreshToken = await RefreshToken.create({
        token : refreshToken,
        user_id : userId,
    });

    return res.json({
        status : 'Success',
        message : 'Create Refresh Token Success',
        data : {
            //id : createdRefreshToken.id,
            id : createdRefreshToken.id,
            user_id : userId,
            refresh_token : refreshToken,
        }
    });

}