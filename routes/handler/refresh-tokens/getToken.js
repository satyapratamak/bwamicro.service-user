const {RefreshToken} = require('../../../models');

module.exports = async (req, res) =>{
    const refreshToken = req.query.refresh_token;
    const token = await RefreshToken.findOne({
        where : {token : refreshToken},
        attributes : ['id', 'token', 'user_id'],
    });

    if (!token){

        // Token not found in database
        return res.status(400).json({
            status : 'Error',
            message : 'Invalid token',
        });
    }

    return res.json({
        status : 'Success',
        message : 'Right Token',
        data : token,
    });
}