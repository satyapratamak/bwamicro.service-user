const {
    User,
    RefreshToken,
} = require('../../../models');

module.exports = async (req, res)=>{
    const userId = req.body.user_id;
    const user = await User.findByPk(userId);

    if (!user){
        return res.status(404).json({
            status : 'Error',
            message : 'User not found',
        });
    }

    const refreshToken = await RefreshToken.destroy({
        where : {user_id : userId},
    });

    if (!refreshToken){
        return res.status(400).json({
            status : 'Error',
            message : 'Error destroy Refresh Token',
        });
    }else{

        return res.json({
            status : 'Success',
            message : 'Refresh Token deleted successfully',
        });

    }
};