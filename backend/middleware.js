/**Purpose:we need to gate routes which authenticated users can hit.
 * Create a middleware.js file that  exports an authMiddleware function
    1. Checks the headers for an Authorization header (Bearer <token>)
    2. Verifies that the token is valid
    3. Puts the userId in the request object if the token checks out.
    4. If not, return a 403 status back to the user */

    const { JWT_SECRET } = require("./config");
    const jwt = require("jsonwebtoken");
    
    const authMiddleware = (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({});
        }
    
        const token = authHeader.split(' ')[1];
    
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
    
            req.userId = decoded.userId;
    
            next();
        } catch (err) {
            return res.status(403).json({});
        }
    };
    
    module.exports = {
        authMiddleware
    }