import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../Redux/slices/productSlice";
import UploadProduct from "../components/UploadProduct";
import { Toaster, toast } from "react-hot-toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [showUpload, setShowUpload] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    toast.success("Product deleted successfully!");
  };
  const handleEdit = (product) => {
    setEditProductData(product);
    setShowUpload(true);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
    

      {/* Left Section - Upload Button */}
      <div className="w-full md:w-1/4 h-[100px] lg:h-[250px] p-4 border rounded-lg shadow-md bg-white flex justify-center items-center">
        <button
          onClick={() => {
            setEditProductData(null);
            setShowUpload(true);
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Upload Product
        </button>
      </div>

      {/* Right Section - Product List */}
      <div className="w-full md:w-3/4 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={product.image?.url || product.image}
                alt={product.name}
                className="w-full h-[150px] object-cover"
              />
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show UploadProduct component if needed */}
      {showUpload && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <UploadProduct
              setShowUpload={setShowUpload}
              editProductData={editProductData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
