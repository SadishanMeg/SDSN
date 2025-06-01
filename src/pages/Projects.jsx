import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, Trash2, FileText, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import NavBar from "../components/Navbar";

const Body = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setEmail(userData.email || "");
        }
    }, []);

    useEffect(() => {
        if (!email) return;

        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=${email}`);
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("Failed to fetch projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [email]);

    const handleViewProject = (project) => {
        navigate("/recommandation", { state: { project } });
    };

    const handleDeleteProject = async (file_name) => {
        toast.warn(
            <div className="p-4">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                    Are you sure you want to delete "<strong>{file_name}</strong>"?
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toast.dismiss()}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                        onClick={async () => {
                            try {
                                await axios.delete(`http://127.0.0.1:5000/api/projects/delete?email=${email}&file_name=${file_name}`);
                                setProjects((prevProjects) => prevProjects.filter(project => project.file_name !== file_name));
                                toast.dismiss();
                                toast.success("Project deleted successfully!");
                            } catch (error) {
                                console.error("Error deleting project:", error);
                                toast.dismiss();
                                toast.error("Failed to delete project. Please try again.");
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
            }
        );
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Your Projects</h1>
                <p className="text-gray-600 mt-2">Manage and view all your project analyses</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="text-rose-500 mb-2">⚠️</div>
                        <p className="text-gray-600">{error}</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">📁</div>
                        <p className="text-gray-600">No projects found</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <FileText className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{project.file_name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{project.date || "No date available"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleViewProject(project)}
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
                                            title="View Project"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.file_name)}
                                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors text-rose-500 hover:text-rose-600"
                                            title="Delete Project"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <NavBar />
            <div className="flex-1 flex flex-col">
                
                <Body />
            </div>
        </div>
    );
};

export default ProjectsPage;
