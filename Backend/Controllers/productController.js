import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const addProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        // Upload image to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "RoomImages" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error);
                    } else resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        // ✅ Save Product with Image Object
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: {  // ✅ Save image as an object
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            }
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// 🔹 Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// 🔹 Get Single Product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// 🔹 Update Product (With Single Image Replacement)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const { name, description, price, category, stock } = req.body;

        // If a new image is uploaded, delete the old one from Cloudinary
        if (req.file) {
            if (product.image && product.image.public_id) {
                await cloudinary.uploader.destroy(product.image.public_id); // Delete old image
            }

            // Upload new image
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "RoomImages" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve({ url: result.secure_url, public_id: result.public_id });
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
            });

            product.image = uploadResult; // Update image
        }

        // Update other fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 🔹 Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Delete image from Cloudinary if exists
        if (product.image && product.image.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        // Delete product from database
        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
