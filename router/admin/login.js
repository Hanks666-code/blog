const bcrypt = require('bcrypt');
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    let { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {
            msg: '邮箱或密码错误'
        })
    }
    let user = await User.findOne({ email });
    if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.username = user.username;
            req.app.locals.userInfo = user;
            res.redirect('/admin/user');
        } else {
            res.render('admin/error.html', {
                msg: '邮箱或密码错误'
            })
        }
    } else {
        res.render('admin/error.html', {
            msg: '邮箱或密码错误'
        })
    }
}