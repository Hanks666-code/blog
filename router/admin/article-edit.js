module.exports = (req, res) => {
    req.app.locals.currentlink = 'article';
    res.render('admin/article-edit')
}