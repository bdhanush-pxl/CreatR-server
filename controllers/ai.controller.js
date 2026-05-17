import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import {
    generateBlogContentService,
    improveContentService,
} from "../services/gemini.service.js";

const generateBlogContent = asyncHandler(async (req, res) => {
    try {
        const { title, category, tags } = req.body;
        const content = await generateBlogContentService(title, category, tags);
        return res.status(200)
            .json(new ApiResponse(200, content, 'Blog generated successfully'));

    } catch (error) {
        console.error("Gemini AI Error:", error);

        if (error.message?.includes("API key")) {
            return res.status(500)
                .json(new ApiError(500, null, "AI service is not configured properly. Please contact support."));
        }

        if (error.message?.includes("quota") || error.message?.includes("limit")) {
            return res.status(503)
                .json(new ApiError(503, null, "AI service is currently unavailable due to usage limits. Please try again later."));
        }

        return res.status(500)
            .json(new ApiError(500, null, "An error occurred while generating content. Please try again."));

    }
})

const improveContent = asyncHandler(async (req, res) => {
    try {
        const { currentContent, improvementType } = req.body;
        const improvedContent = await improveContentService(currentContent, improvementType);
        return res.status(200)
            .json(new ApiResponse(200, improvedContent, 'Content improved successfully'));
    } catch (error) {
        console.error("Content improvement error:", error);
        return res.status(500)
            .json(new ApiError(500, null, "An error occurred while improving content. Please try again."));
    }
})

export {
    generateBlogContent,
    improveContent,
};