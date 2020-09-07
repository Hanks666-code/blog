const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');
mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    }
})
const User = mongoose.model('User', userSchema);
User.findOne({'email': '1819000169@qq.com'}).then(async result => {
	if (result == null) {
		// 生成盐
		const salt = await bcrypt.genSalt(10);
		// 使用盐对密码进行加密
		const password = await bcrypt.hash('123456', salt);

		const user = await User.create({
			username: 'songheng',
			email: '1819000169@qq.com',
			password: password,
			role: 'admin',
			status: 0
		});
	}
})
const validateUser = user => {
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合规范')),
        email: joi.string().email().required().error(new Error('邮箱不符合规范')),
        password: joi.string().regex(/^[0-9a-zA-z]{3,30}$/).error(new Error('密码不符合规范')),
        role: joi.string(),
        state: joi.number()
    };
    return joi.validate(user, schema);
}
module.exports = {
    User,
    validateUser
}