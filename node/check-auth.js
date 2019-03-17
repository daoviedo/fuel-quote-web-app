const jwt = require('jsonwebtoken');
const privateKey = "ASLFJDGasdkdgasfsdlgkasdflgmpashlmh";

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, privateKey);
        req.userData = decoded;
        console.log(req.body)
        next();
    }catch (error) {
        return res.json({
            authentication: false,
        });
    }
}