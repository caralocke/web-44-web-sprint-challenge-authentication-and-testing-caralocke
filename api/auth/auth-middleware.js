const Users = require('../users/users-model')

module.exports= {
    validateUser,
    usernameIsUnique
}

function validateUser(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({ message: 'username and password are required'})
    } else {
        next()
    }
}

function usernameIsUnique(req, res, next) {
    Users.findBy(req.body.username)
        .then(user => {
            if (user) {
                res.status(400).json({ message: 'username taken'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}