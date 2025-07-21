const jwt = require('jsonwebtoken');

const JWT_SECRET = '!@#$%wasikaran^&*()'

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token')
    console.log("token received ", token)

    if (!token){
    console.log("token not received")
    return res.status(401).json({error: "please authenticate with a valid token"})

    }
    try{
        const data = jwt.verify(token , JWT_SECRET)
        req.user = data.user
        console.log("token verifiied! user Id ", req.user.id)
        next();
    }
    catch (error){
        console.log("token verification failed" , error.message)
        return res.status(401).json({error: "please authenticate with a valid token"})
    }
}

module.exports = fetchuser;