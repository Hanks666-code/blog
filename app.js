const express = require('express');
const server = express();
const path = require('path');
const home = require('./router/home');
const admin = require('./router/admin');
const dateFormat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');
const config = require('config');
const session = require('express-session');
require('./model/connect');
const bodyParser = require('body-parser');
template.defaults.imports.dateFormat = dateFormat;
server.use(session({ secret: 'secret key', saveUninitialized: false }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
console.log(config.get('title'));
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境')
        // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    server.use(morgan('dev'))
} else {
    // 当前是生产环境
    console.log('当前是生产环境')
}

server.use('/admin', require('./middleware/loginGuard'))
server.use('/home', home);
server.use('/admin', admin);
server.use((err, req, res, next) => {
    const result = JSON.parse(err);
    // {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

server.engine('html', require('express-art-template'));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');
server.listen(80);
console.log('服务器启动成功');