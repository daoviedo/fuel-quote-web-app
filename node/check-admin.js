const jwt = require('jsonwebtoken');
const privateKey = "ASLFJDGasdkdgasfsdlgkasdflgmpashlmh";

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, privateKey);
        if(decoded.privelege === "Admin"){
            next();
        }
        else{
            return res.json({
                authentication: false,
            });
        }
    }catch (error) {
        return res.json({
            authentication: false,
        });
    }
}