import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  editProduct,
  fetchProducts,
} from "../Redux/slices/productSlice";
import { toast } from "react-hot-toast";

const UploadProduct = ({ setShowUpload, editProductData }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editProductData) {
      setProduct({
        name: editProductData.name,
        description: editProductData.description,
        price: editProductData.price,
        category: editProductData.category,
        image: null,
      });
      setImagePreview(editProductData.image);
    }
  }, [editProductData]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
  
    if (product.image instanceof File) {
      // Only append the image if a new image is uploaded
      formData.append("image", product.image);
    }
  
    if (editProductData) {
      await dispatch(editProduct({ id: editProductData._id, updatedData: formData }));
      toast.success("Product updated successfully!");
    } else {
      await dispatch(addProduct(formData));
      toast.success("Product added successfully!");
    }
  
    dispatch(fetchProducts()); // Refresh product list
    setShowUpload(false);
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {editProductData ? "Edit Product" : "Upload Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {editProductData ? "Update" : "Submit"}
        </button>
      </form>

      <button
        onClick={() => setShowUpload(false)}
        className="w-full mt-3 text-red-500 hover:underline"
      >
        Cancel
      </button>
    </div>
  );
};

export default UploadProduct;
