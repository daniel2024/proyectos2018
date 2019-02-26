import {Response,Request,Router} from 'express';

import Post from '../src/models/Post'

class PostRoutes{

    router :Router;

    constructor(){
        this.router=Router();
    }
async getPosts(req :Request, res:Response):Promise<void> {
  const posts= await  Post.find();
  res.json(posts);
}
async getPost(req :Request, res:Response):Promise<void>{
 const post=await Post.findOne({url:req.params.url});
   res.send(post);
  
}
async createPost(req :Request, res:Response):Promise<void>{
    const {title ,url, content,image }= req.body;
    const newPost= new Post({title ,url, content,image });
    await newPost.save();
    res.json({date:newPost});
}

async updatePost(req :Request, res:Response):Promise<void>{
    const {url}=req.params;

   const post= await Post.findOneAndUpdate({url},req.body,{new:true});

   res.send(post);
}
async deletePost(req :Request, res:Response):Promise<void>{

    const {url} =req.params;
  await  Post.findOneAndDelete({url});

    res.send({response:'delete succesfuly'});
}

routes(){
this.router.get('/',this.getPosts)
this.router.get('/:url',this.getPost)
this.router.post('/',this.createPost)
this.router.put('/:url',this.updatePost)
this.router.delete('/:url',this.deletePost)
}

}

const postRoutes= new PostRoutes();

postRoutes.routes();

export default postRoutes.router;