const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Yelpcamp!")
            res.redirect("/campgrounds");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
}

module.exports.loginUser = (req, res) => {
    req.flash("success", "Welcome back!");
    const url = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(url);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
}