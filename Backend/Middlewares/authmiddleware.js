const JWT=require('jsonwebtoken')

const requireLogin=async(req,res,next)=>{
  try {
      const decode=JWT.verify(req.headers.authorization,process.env.SECRET_KEY);
      req.user=decode;
      next();
  } catch (error) {
      return error;
  }
  }

  module.exports=requireLogin