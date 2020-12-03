function checkAccess (req, res, next) {
    console.log(req.session)
    if (req.session.user && req.session.user.category === "admin"){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = checkAccess;