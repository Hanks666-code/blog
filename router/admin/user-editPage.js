const { User } = require('../../model/user');
module.exports = async(req, res) => {
    req.app.locals.currentlink = 'user';
    const { message, id } = req.query;
    let user = await User.findOne({ _id: id });

    if (id) {
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }

}