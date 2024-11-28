//ESIMERKKI OMASTA AUTENTIKOINNISTA MIDDLEWARE-MODUULIN AVULLA

// authMiddleware.js
const crypt = require('./kryptaus'); // Assuming crypt.js is where you define VerifyPassword function

// Authentication middleware
async function authMiddleware(req, res, next) {
    try {
        // Check if username and password are provided
        const { username, password } = req.body;
        // const username = req.body.username
        // const password = req.body.password
        if (!username || !password) {
            return res.render('login', { error: "Username and password are required" });
        }

        // Verify password using the crypt module
        const isLogged = await crypt.VerifyPassword(username, password,req.app.locals.collection);
                                                    //req.app.locals voi itse asettaa = coll pääohjelmassa

        if (isLogged) {
            // User is authenticated, proceed to the next middleware or route handler
            return next();
        } else {
            // Authentication failed
            return res.render('login', { error: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = authMiddleware;