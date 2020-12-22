function checkAccess (req, res, next) {
    console.log(req.session)
    if (req.session.user && req.session.user.category_id == 2){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = checkAccess;