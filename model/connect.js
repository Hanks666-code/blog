const mongoose = require('mongoose');
const config = require('config');
console.log(config.get('db.host'))
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库启动成功'))
    .catch(() => console.log('数据库启动失败'))