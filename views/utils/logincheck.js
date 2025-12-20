module.exports = (req, res, next) => {
    if (!req.signedCookies.email) {
        req.flash('error', 'You must be logged in to do that!');
        return res.redirect('/login');
    }else{
        next();
    }

}