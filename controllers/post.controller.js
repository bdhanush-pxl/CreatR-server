import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.js"
import Post from "../models/post.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

const getUserDraft = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(401, 'Unauthorized request, Please login to continue');
    }
    const draft = await Post.findOne({ authorId: userId, status: 'draft' });
    if (!draft) {
        return res.status(404)
        .json( new ApiResponse(404, null, 'No draft found for the user') );
    }
    return res.status(200)
    .json( new ApiResponse(200, draft, 'Draft retrieved successfully') );
})

const createPost = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(401, 'Unauthorized request, Please login to continue');
    }
    const {title,content,status,tags,category,featuredImage,publishedAt,updatedAt,createdAt,scheduledFor} = req.body;
    if(!title || !content){
        throw new ApiError(400, 'Title and content are required');
    }
    const draft = await Post.findOne({ authorId: userId, status: 'draft' });
    const date= new Date();

    //if publishing and we have an existing draft , we update the draft and publish it
    if(status === 'published' && draft){
        draft.title = title;
        draft.content = content;
        draft.status = 'published';
        draft.tags = tags? tags: [];
        draft.category = category;
        draft.featuredImage = featuredImage;
        draft.publishedAt = date;
        draft.updatedAt = date;
        draft.scheduledFor = scheduledFor;
        await draft.save({validateBeforeSave: false});
        return res.status(200)
        .json( new ApiResponse(200, draft, 'Draft published successfully') );
    }

    //if creating a draft and there is an existing draft, we update the existing draft
    if(status === 'draft' && draft){
        draft.title = title;
        draft.content = content;
        draft.tags = tags? tags: [];
        draft.category = category;
        draft.featuredImage = featuredImage;
        draft.scheduledFor = scheduledFor;
        await draft.save({validateBeforeSave: false});
        return res.status(200)
        .json( new ApiResponse(200, draft, 'Draft published successfully') );
    }

    //creating new post (either first draft or direct publish)
    const newPost = new Post({
        title,
        content,
        status: status? status : 'draft',
        authorId: userId,
        tags: tags? tags: [],
        category,
        featuredImage,
        publishedAt: status === 'published' ? date : null,
        createdAt: date,
        updatedAt: date,
        scheduledFor,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0
    })
    await newPost.save({validateBeforeSave: false});
    return res.status(201)
    .json( new ApiResponse(201, newPost, 'Post created successfully') );
})

const updatePost = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(401, 'Unauthorized request, Please login to continue');
    }
    const {postId,title,content,status,authorId,tags,category,featuredImage,publishedAt,updatedAt,createdAt,scheduledFor} = req.body;
    if(!postId){
        throw new ApiError(400, 'Post ID is required');
    }
    if(authorId!== userId.toString()){
        throw new ApiError(403, 'You are not authorized to update this post');
    }
    const date= new Date();
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(404, 'Post not found');
    }
    post.title = title? title : post.title;
    post.content = content? content : post.content;
    post.status = status? status : post.status;
    post.tags = tags? tags : post.tags;
    post.category = category? category : post.category;
    post.featuredImage = featuredImage? featuredImage : post.featuredImage;
    post.publishedAt = status === 'published' && post.publishedAt === null ? date : post.publishedAt;
    post.updatedAt = date;
    post.scheduledFor = scheduledFor? scheduledFor : post.scheduledFor;
    await post.save({validateBeforeSave: false});
    return res.status(200)
    .json( new ApiResponse(200, post, 'Post updated successfully') );
})

export {getUserDraft, createPost, updatePost}