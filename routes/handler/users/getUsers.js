const {User} = require('../../../models');

module.exports = async (req, res) => {

    const userIds = req.query.user_ids || [];

    //const sqlOptions = ['id', 'name', 'email', 'profession', 'avatar'];

    if (userIds.length){
        
        const users = await User.findAll({
            attributes : ['id', 'name', 'email', 'profession', 'avatar'],
            where : {
                id : userIds,
            }
        });

        if (!users){
            return res.status(404).json({
                status : 'Error',
                message : 'User not found',
            });
        }

        return res.json({
            status : 'success',
            message : 'User found',
            data : users,
        }); 
        
    }else {
        const users = await User.findAll({
            attributes : ['id', 'name', 'email', 'profession', 'avatar'],
            
        });

        if (!users){
            return res.status(404).json({
                status : 'Error',
                message : 'User not found',
            });
        }

        return res.json({
            status : 'success',
            message : 'User found',
            data : users,
        });

    }
  
}