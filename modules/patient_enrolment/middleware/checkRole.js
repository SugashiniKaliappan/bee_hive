
function checkRole(roles) {
    return async function(req, res, next) {
        try {
        const user = req.user;
        console.log(user)
        console.log('checkRole again')
        console.log(`checkRole.js: user id = ${user.id}`);
        if (!user || user === null) {
            return res.status(401).send({ message: 'Unauthorized, undefined or null', success: false });
        }
        if (!roles.includes(user.role)) {
            return res.status(403).send({ message: `Authorization success,Role = ${user.role}`, success: false });
        }
        //if ok
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'An internal server error occurred', success: false });
    }
    }
}

module.exports = checkRole;