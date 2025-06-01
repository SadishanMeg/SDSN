import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Upload, Trash2, User, Mail, Phone } from "lucide-react";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch user data from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setName(userData.name || "");
            setEmail(userData.email || "");
            setMobile(userData.mobile || "");
            if (userData.image) {
                setImage(userData.image);
            }
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

            // Update local storage with new image
            const updatedUser = { name, email, mobile, image: imageUrl };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        const updatedUser = { name, email, mobile, image: null };
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const handleUpdateUser = async () => {
        setIsLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token"); // Get token if needed
            const response = await axios.post(
                "http://127.0.0.1:5000/auth/update",
                { name, email, mobile, image, "previusEmail": email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token if required
                        "Content-Type": "application/json",
                    },
                }
            );

            // Success - Update local storage
            localStorage.setItem("user", JSON.stringify({ name, email, mobile, image }));
            setMessage("Profile updated successfully!");
            toast.success("Profile updated successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update profile");
            toast.error(error.response?.data?.message || "Failed to update profile");
        }

        setIsLoading(false);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
                <p className="text-gray-600 mt-2">Manage your profile information</p>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
                                <User className="w-16 h-16 text-gray-400" />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer">
                                    <Upload className="w-8 h-8 text-white" />
                                    <input type="file" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload
                                <input type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                            {image && (
                                <button
                                    className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-2"
                                    onClick={handleRemoveImage}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                disabled
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none cursor-not-allowed"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Mobile Number"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="mt-8">
                        <button
                            onClick={handleUpdateUser}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </div>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`mt-4 p-4 rounded-lg ${message.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Accounts = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <NavBar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Body />
            </div>
        </div>
    );
};

export default Accounts;
