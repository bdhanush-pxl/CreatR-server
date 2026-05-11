import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [String],
    category: String,
    featuredImage: String,
    publishedAt: Date,
    scheduledFor: Date,
    viewCount: Number,
    likeCount: Number,
    commentCount: Number,
},{ timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;