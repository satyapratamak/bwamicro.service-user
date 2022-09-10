const {User} = require('../../../models');

module.exports = async (req, res) => {

    const id = req.params.id;

    const user = await User.findByPk(id, {
        attributes : ['id', 'name', 'email', 'profession', 'avatar']
    });

    // Check user availability
    if (!user){
        return res.status(404).json({
            status : 'error',
            message : 'User not found',
        });
    }

    return res.json({
        status : 'success',
        message : 'User found',
        data : user,
    }); 
}