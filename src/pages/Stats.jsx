import { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import Header from "../components/Header";
import NavBar from "../components/Navbar";

const Stats = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
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
                const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=sadishancisco3@gmail.com`);
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

    // Calculate statistics
    const calculateStats = () => {
        const stats = {
            technical: {},
            financial: {},
            organizational: {},
            operational: {}
        };

        projects.forEach(project => {
            ['technical', 'financial', 'organizational', 'operational'].forEach(category => {
                const result = project[`${category}_result`];
                stats[category][result] = (stats[category][result] || 0) + 1;
            });
        });

        return stats;
    };

    const stats = calculateStats();

    // Calculate overall distribution for pie chart
   const calculateOverallDistribution = () => {
    const validLevels = ['L1', 'L2', 'L3', 'L4', 'L5'];
    const distribution = {
        L1: 0,
        L2: 0,
        L3: 0,
        L4: 0,
        L5: 0
    };

    projects.forEach(project => {
        ['technical', 'financial', 'organizational', 'operational'].forEach(category => {
            const result = project[`${category}_result`];
            if (validLevels.includes(result)) {
                distribution[result] += 1;
            }
        });
    });

    return validLevels.map(level => ({
        name: level,
        value: distribution[level]
    }));
};

    const overallDistribution = calculateOverallDistribution();

    // Bar chart options
    const barChartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['L1', 'L2', 'L3', 'L4', 'L5'],
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        legend: {
            position: 'bottom'
        },
        title: {
            text: 'Project Results Distribution by Category',
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 600
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    height: 300
                },
                title: {
                    style: {
                        fontSize: '14px'
                    }
                }
            }
        }]
    };

    // Pie chart options
    const pieChartOptions = {
        chart: {
            type: 'pie',
            toolbar: {
                show: false
            }
        },
        labels: ['L1', 'L2', 'L3', 'L4', 'L5'],
        colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0'],
        legend: {
            position: 'bottom'
        },
        title: {
            text: 'Overall Results Distribution',
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 600
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    width: 280,
                    height: 300
                },
                legend: {
                    position: 'bottom'
                },
                title: {
                    style: {
                        fontSize: '14px'
                    }
                }
            }
        }]
    };

    const barChartSeries = [
        {
            name: 'Technical',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.technical[level] || 0)
        },
        {
            name: 'Financial',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.financial[level] || 0)
        },
        {
            name: 'Organizational',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.organizational[level] || 0)
        },
        {
            name: 'Operational',
            data: ['L1', 'L2', 'L3', 'L4', 'L5'].map(level => stats.operational[level] || 0)
        }
    ];

    const pieChartSeries = overallDistribution.map(item => item.value);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <NavBar />
            <div className="flex flex-col flex-1 min-w-0">
                
                <div className="flex-1 overflow-auto">
                    <div className="p-4 lg:p-6 max-w-full">
                        {/* Charts Section */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
                            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md min-w-0">
                                <h2 className="text-lg lg:text-xl font-semibold text-gray-700 mb-4">Category Distribution</h2>
                                <div className="w-full h-[350px] lg:h-[400px]">
                                    <ReactApexChart
                                        options={barChartOptions}
                                        series={barChartSeries}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md min-w-0">
                                <h2 className="text-lg lg:text-xl font-semibold text-gray-700 mb-4">Overall Distribution</h2>
                                <div className="w-full h-[350px] lg:h-[400px] flex items-center justify-center">
                                    <ReactApexChart
                                        options={pieChartOptions}
                                        series={pieChartSeries}
                                        type="pie"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md min-w-0">
                            <h2 className="text-lg lg:text-xl font-semibold text-gray-700 mb-4">Project Details</h2>
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                    <p className="text-gray-500 mt-2">Loading projects...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <div className="text-red-500 mb-2">⚠️</div>
                                    <p className="text-red-500">{error}</p>
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 mb-2">📊</div>
                                    <p className="text-gray-500">No projects found</p>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto -mx-4 lg:-mx-6">
                                        <div className="inline-block min-w-full px-4 lg:px-6">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            File Name
                                                        </th>
                                                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Technical
                                                        </th>
                                                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Financial
                                                        </th>
                                                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Organizational
                                                        </th>
                                                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Operational
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {currentItems.map((project, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-3 lg:px-6 py-4 text-sm font-medium text-gray-900">
                                                                <div className="truncate max-w-[150px] lg:max-w-none" title={project.file_name}>
                                                                    {project.file_name}
                                                                </div>
                                                            </td>
                                                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${project.technical_result === 'L1' ? 'bg-red-100 text-red-800' :
                                                                    project.technical_result === 'L2' ? 'bg-orange-100 text-orange-800' :
                                                                        project.technical_result === 'L3' ? 'bg-yellow-100 text-yellow-800' :
                                                                            project.technical_result === 'L4' ? 'bg-blue-100 text-blue-800' :
                                                                                'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {project.technical_result}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${project.financial_result === 'L1' ? 'bg-red-100 text-red-800' :
                                                                    project.financial_result === 'L2' ? 'bg-orange-100 text-orange-800' :
                                                                        project.financial_result === 'L3' ? 'bg-yellow-100 text-yellow-800' :
                                                                            project.financial_result === 'L4' ? 'bg-blue-100 text-blue-800' :
                                                                                'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {project.financial_result}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${project.organizational_result === 'L1' ? 'bg-red-100 text-red-800' :
                                                                    project.organizational_result === 'L2' ? 'bg-orange-100 text-orange-800' :
                                                                        project.organizational_result === 'L3' ? 'bg-yellow-100 text-yellow-800' :
                                                                            project.organizational_result === 'L4' ? 'bg-blue-100 text-blue-800' :
                                                                                'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {project.organizational_result}
                                                                </span>
                                                            </td>
                                                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${project.operational_result === 'L1' ? 'bg-red-100 text-red-800' :
                                                                    project.operational_result === 'L2' ? 'bg-orange-100 text-orange-800' :
                                                                        project.operational_result === 'L3' ? 'bg-yellow-100 text-yellow-800' :
                                                                            project.operational_result === 'L4' ? 'bg-blue-100 text-blue-800' :
                                                                                'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {project.operational_result}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex flex-wrap justify-center mt-6 gap-2">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                                    }`}
                                            >
                                                Previous
                                            </button>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePageChange(index + 1)}
                                                    className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === index + 1
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats; 