
import { Schema, model } from 'mongoose';
import Post from './Post';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    username: { type: String, required: true, lowercase: true },
    createdAt: { type: Date, default: Date.now() },
    //para hacer una relacion de User.id OneToMany Post
    post:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]
    
});

export default model('User', UserSchema);