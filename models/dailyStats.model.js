import mongoose from "mongoose";

const dailyStatsSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: Date,
    views: Number,
},{ timestamps: true });

const DailyStats = mongoose.model('DailyStats', dailyStatsSchema);
export default DailyStats;