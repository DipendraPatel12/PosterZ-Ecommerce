import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: {  // ✅ Change from String to Object
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    }
});


export default mongoose.model("Product", productSchema);
