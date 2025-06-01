import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ArrowLeft, CheckSquare, Calendar, FileText } from "lucide-react";
import NavBar from "../components/Navbar";

const Body = () => {
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("08/02/2025");
    const [toDate, setToDate] = useState("08/02/2025");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");

    // Fetch user email from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.email) {
                setEmail(userData.email);
            }
        }
    }, []);

    // Fetch projects when email is set
    useEffect(() => {
        const fetchProjects = async () => {
            if (!email) return; // Avoid making API call if email is empty

            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=${email}`);
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [email]); // Depend on email, so it runs when email updates

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Project History</h1>
                <p className="text-gray-600 mt-2">View and analyze your project history</p>
            </div>

            {/* Search and Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Date Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">From:</span>
                        <span className="font-semibold text-gray-800">{fromDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">To:</span>
                        <span className="font-semibold text-gray-800">{toDate}</span>
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Project History</h2>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">📁</div>
                        <p className="text-gray-600">No projects found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <FileText className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{project.file_name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{project.date || "No date available"}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckSquare className="w-5 h-5 text-purple-500" />
                                        <span className="text-sm font-medium text-gray-600">Completed</span>
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

const History = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <NavBar />
            <div className="flex-1 flex flex-col">
                <Body />
            </div>
        </div>
    );
};

export default History;
