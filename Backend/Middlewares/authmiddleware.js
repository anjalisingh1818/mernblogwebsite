const JWT=require('jsonwebtoken')

const requireLogin=async(req,res,next)=>{
  try {
      const decode=JWT.verify(req.headers.authorization,process.env.SECRET_KEY);
      req.user=decode;
      next();
  } catch (error) {
      console.log(error);
  }
  }

  module.exports=requireLogin