import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/Cars.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find().select('-othersImg');
        
        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {

    const { brand, model, version, type, year, km, price, transmission, fuel, t4x4, armor, addInfo,
        mainImg, othersImg } = req.body;

    const newPostMessage = new PostMessage({ brand, model, version, type, year, km, price, 
        transmission, fuel, t4x4, armor, addInfo, mainImg, othersImg })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { brand, model, version, type, year, km, price, transmission, fuel, t4x4, armor, addInfo,
        mainImg, othersImg } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { brand, model, version, type, year, km, price, transmission, fuel,  t4x4,
        armor, addInfo, mainImg, othersImg, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export default router;