const { User } = require('../../model/user');
module.exports = async(req, res) => {
    req.app.locals.currentlink = 'user';
    let page = req.query.page || 1;
    let pagesize = 5;
    let count = await User.countDocuments({});
    let totalpage = Math.ceil(count / pagesize);
    let start = (page - 1) * pagesize;
    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        totalpage: totalpage
    });
}