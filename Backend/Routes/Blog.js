const express=require('express')
const app=express();
const Blog=require('../Models/blogModel');
const { requirelogin } = require('../Middlewares/authmiddleware');
const routes=express.Router();
routes.get('/',async(req,res)=>{
    try{
        const allblog=await Blog.find().sort({timestamp:-1});
        res.status(200).json(allblog);
    }catch(err){
        res.status(400).json({err:err.message});
    }
  
})
routes.post('/create/:id',async(req,res)=>{
    try{
        const {id}=req.params
       const {title,desc,image}=req.body;
       if(!title){
        res.status(400).json({ error: "Title is compulsory" });
      }

      if(!desc){
        res.status(400).json({ error: "Description is compulsory" });
      }
        const newBlog=await Blog.create({
            title:title,
            desc:desc,
            image:image,
            author:id
        })
        console.log(newBlog)
        newBlog.save();
       console.log(newBlog)
        res.status(201).json(newBlog)
       }catch(err){
        res.status(400).json({error:"Error!"});
       }
})
routes.get('/:blogid',async(req,res)=>{
    try{
        const {blogid}=req.params;
        const findBlog=await Blog.findById({_id:blogid});
        res.status(200).json(findBlog);
         }catch(err){
             res.status(400).json({err:err.message});
             console.log(err.message)
         }
     
})
routes.delete('/:blogid/delete',async(req,res)=>{
    try{
   const {blogid}=req.params;
   const findBlog=await Blog.findByIdAndDelete({_id:blogid});
   res.status(200).json(findBlog);
    }catch(err){
        res.status(400).json({err:err.message});
    }

})
routes.patch('/edit/:blogid',async(req,res)=>{
    const {title ,desc}=req.body
    try{
        if(!title){
            res.status(400).json({ error: "Title is compulsory" });
          }
    
          if(!desc){
            res.status(400).json({ error: "Description is compulsory" });
          }
   const {blogid}=req.params;
   const findBlog=await Blog.findByIdAndUpdate(blogid,req.body,{new:true});
   res.status(200).json(findBlog);
    }catch(err){
        res.status(400).json({error:"Error Occured"});
    }

})
routes.get('/show/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const findBlogs=await Blog.find({author:id});
        res.status(200).json(findBlogs);
         }catch(err){
             res.status(400).json({err:err.message});
         }
})
module.exports=routes;