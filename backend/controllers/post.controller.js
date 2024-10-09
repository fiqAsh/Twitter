import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
	try {
		const { text } = req.body;
		let { img } = req.body;
		const userId = req.user._id.toString();

		const user = await User.findById(userId);
		if (!user) return res.status(400).json({ message: "user not found" });
		if (!text && !img) {
			return res
				.status(400)
				.json({ message: "post must have text or image" });
		}
		const newPost = new Post({
			user: userId,
			text,
			img,
		});

		if (img) {
			const uploadResponse = await cloudinary.uploader.upload(img);
			img = uploadResponse.secure_url;
		}

		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "internal server error" });
	}
};
