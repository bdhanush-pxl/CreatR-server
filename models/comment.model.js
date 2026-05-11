import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: String,
    authorEmail: String,
    content: String,
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
},{ timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;