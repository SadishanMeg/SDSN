import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { Eye, Trash2, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const Body = () => {
  const [projects, setProjects] = useState([]);
  const [latestProject, setLatestProject] = useState(null);
  const [projectStatus, setProjectStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      fetchProjects(user.email);
    }
  }, []);

  const fetchProjects = async (email) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/projects?email=${email}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setProjects(response.data.projects);

      if (response.data.projects.length > 0) {
        setLatestProject(response.data.projects[response.data.projects.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (latestProject) {
      console.log("Received Project:", latestProject);

      const { financial_result, operational_result, organizational_result, technical_result } = latestProject;

      // Get all levels in an array
      const levels = [financial_result, operational_result, organizational_result, technical_result];

      if (levels.every(level => level === "L1")) {
        setProjectStatus("Highly Feasible");
      } else if (levels.includes("L4")) {
        setProjectStatus("Not Feasible");
      } else if (levels.filter(level => level === "L1").length === 2 && levels.filter(level => level === "L2").length === 2) {
        setProjectStatus("Moderately Feasible");
      } else if (levels.every(level => level === "L2")) {
        setProjectStatus("Moderately Feasible");
      } else {
        setProjectStatus("Marginally Feasible");
      }
    }
  }, [latestProject]);

  // Categorizing projects based on feasibility
  const totalProjects = projects?.length || 0;
  let highlyFeasibleCount = 0;
  let moderatelyFeasibleCount = 0;
  let marginallyFeasibleCount = 0;
  let notFeasibleCount = 0;

  projects.forEach((x) => {
    const results = [
      x.financial_result,
      x.operational_result,
      x.organizational_result,
      x.technical_result
    ];

    const countL1 = results.filter(r => r === 'L1').length;
    const countL2 = results.filter(r => r === 'L2').length;
    const countL4 = results.filter(r => r === 'L4').length;

    if (countL1 === 4) {
      highlyFeasibleCount += 1;
    } else if (countL4 > 0) {
      notFeasibleCount += 1;
    } else if (countL1 >= 2 && countL2 >= 2) {
      moderatelyFeasibleCount += 1;
    } else {
      marginallyFeasibleCount += 1;
    }
  });

  const statusColor = {
    "Highly Feasible": "bg-emerald-500",
    "Not Feasible": "bg-rose-500",
    "Moderately Feasible": "bg-amber-500",
    "Marginally Feasible": "bg-orange-500",
  };

  const statusIcon = {
    "Highly Feasible": <CheckCircle className="w-5 h-5" />,
    "Not Feasible": <XCircle className="w-5 h-5" />,
    "Moderately Feasible": <TrendingUp className="w-5 h-5" />,
    "Marginally Feasible": <AlertTriangle className="w-5 h-5" />,
  };

  const handleViewProject = (project) => {
    navigate("/recommandation", { state: { project } });
  };

  // Chart configurations
  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['Highly Feasible', 'Moderately Feasible', 'Marginally Feasible', 'Not Feasible'],
    colors: ['#10B981', '#0B6EF5', '#F97316', '#EF4444'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const pieChartSeries = [
    highlyFeasibleCount,
    moderatelyFeasibleCount,
    marginallyFeasibleCount,
    notFeasibleCount
  ];

  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: projects.map((_, index) => `Project ${index + 1}`),
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'light'
    },
    colors: ['#3B82F6']
  };

  const lineChartSeries = [{
    name: 'Feasibility Score',
    data: projects.map(project => {
      const results = [
        project.financial_result,
        project.operational_result,
        project.organizational_result,
        project.technical_result
      ];
      const score = results.reduce((acc, curr) => {
        if (curr === 'L1') return acc + 4;
        if (curr === 'L2') return acc + 3;
        if (curr === 'L3') return acc + 2;
        return acc + 1;
      }, 0) / 4;
      return score;
    })
  }];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your project feasibility analysis</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Projects</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">{totalProjects}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Highly Feasible</h3>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-4xl font-bold text-emerald-600">{highlyFeasibleCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Moderately Feasible</h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-4xl font-bold text-blue-600">{moderatelyFeasibleCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Marginally Feasible</h3>
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <p className="text-4xl font-bold text-amber-600">{marginallyFeasibleCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Not Feasible</h3>
            <div className="p-2 bg-rose-50 rounded-lg">
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>
          </div>
          <p className="text-4xl font-bold text-rose-600">{notFeasibleCount}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Feasibility Trend</h3>
          <ReactApexChart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={350}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Feasibility Distribution</h3>
          <ReactApexChart
            options={pieChartOptions}
            series={pieChartSeries}
            type="pie"
            height={350}
          />
        </div>
      </div>

      {/* Latest Report */}
      {latestProject && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Latest Project Analysis</h2>
              <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-500 text-sm mb-1">Project Name</p>
                <p className="text-2xl font-semibold text-gray-800">{latestProject.file_name}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${statusColor[projectStatus] || "bg-gray-400"} text-white`}>
                  {statusIcon[projectStatus]}
                  <span className="font-medium">{projectStatus || "Pending"}</span>
                </div>

                <button
                  onClick={() => handleViewProject(latestProject)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 text-gray-600 hover:text-gray-800"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => (
  <div className="flex h-screen bg-gray-50">
    <NavBar />
    <div className="flex-1 flex flex-col">
     
      <Body />
    </div>
  </div>
);

export default Dashboard;
