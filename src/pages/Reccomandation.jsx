import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, TrendingUp, FileText, Building, Settings, DollarSign, Search } from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

const Body = () => {
    const [projectStatus, setProjectStatus] = useState("");
    const [projectPercentage, setProjectPercentage] = useState(0);
    const [individualResults, setIndividualResults] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const project = location.state?.project;

    // Enhanced recommendations with more detailed guidance
    const recommendations = {
        organizational: {
            "Highly Feasible": [
                "Excellent organizational alignment with strategic goals",
                "Strong stakeholder support and management backing",
                "Optimal organizational structure for project success",
                "Proceed with confidence - all organizational factors are favorable"
            ],
            "Moderately Feasible": [
                "Good organizational foundation with minor improvements needed",
                "Enhance stakeholder communication and engagement",
                "Consider organizational structure adjustments",
                "Develop stronger change management strategies"
            ],
            "Marginally Feasible": [
                "Significant organizational challenges require attention",
                "Improve stakeholder buy-in and support mechanisms",
                "Restructure project governance and reporting lines",
                "Implement comprehensive change management program"
            ],
            "Not Feasible": [
                "Critical organizational barriers prevent project success",
                "Major stakeholder resistance and lack of support",
                "Fundamental organizational restructuring required",
                "Consider project postponement until organizational readiness improves"
            ]
        },
        technical: {
            "Highly Feasible": [
                "Technology stack aligns perfectly with industry standards",
                "Excellent technical infrastructure and capabilities",
                "Strong development team and technical expertise",
                "All technical requirements can be met efficiently"
            ],
            "Moderately Feasible": [
                "Upgrade hardware specifications (RAM, storage, processor)",
                "Consider modern frameworks: React/Vue.js for frontend, Node.js/Python for backend",
                "Implement cloud-based solutions for better scalability",
                "Enhance security protocols and data protection measures"
            ],
            "Marginally Feasible": [
                "Significant technical upgrades required before proceeding",
                "Improve software and hardware compatibility",
                "Invest in team training and technical skill development",
                "Consider phased implementation to manage technical risks"
            ],
            "Not Feasible": [
                "Critical technical limitations prevent project execution",
                "Complete technology stack overhaul required",
                "Recommended: Modern OS (Windows 11/Linux), Cloud infrastructure",
                "Suggested stack: React/Angular frontend, Spring Boot/Django backend, PostgreSQL/MongoDB database"
            ]
        },
        operational: {
            "Highly Feasible": [
                "Perfect alignment with current operational workflows",
                "Adequate resources and operational capacity available",
                "Strong operational processes and procedures in place",
                "Minimal disruption to existing operations expected"
            ],
            "Moderately Feasible": [
                "Minor operational adjustments needed for optimal performance",
                "Improve resource allocation and workflow optimization",
                "Enhance process documentation and standard procedures",
                "Implement better monitoring and performance metrics"
            ],
            "Marginally Feasible": [
                "Substantial operational changes required for success",
                "Address resource constraints and capacity limitations",
                "Redesign workflows and operational procedures",
                "Implement comprehensive training and support programs"
            ],
            "Not Feasible": [
                "Major operational obstacles prevent project implementation",
                "Critical resource shortages and capacity constraints",
                "Fundamental operational model changes required",
                "Consider operational restructuring before project restart"
            ]
        },
        financial: {
            "Highly Feasible": [
                "Strong financial foundation with adequate funding",
                "Excellent ROI projections and cost-benefit analysis",
                "Optimize tax benefits and financial incentives",
                "Implement robust financial monitoring and controls"
            ],
            "Moderately Feasible": [
                "Reassess ROI expectations and financial projections",
                "Explore additional funding sources (grants, partnerships)",
                "Optimize resource allocation between technical and functional areas",
                "Implement cost monitoring and budget control measures"
            ],
            "Marginally Feasible": [
                "Diversify funding sources to improve financial stability",
                "Implement strict cost monitoring and budget controls",
                "Allocate 10-15% contingency budget for unforeseen expenses",
                "Consider phased funding approach to reduce financial risk"
            ],
            "Not Feasible": [
                "Critical financial constraints prevent project execution",
                "Complete business model re-evaluation required",
                "Consider MVP approach to reduce initial investment",
                "Explore alternative funding models (leasing, outsourcing, partnerships)"
            ]
        }
    };

    // Fixed status calculation logic
    useEffect(() => {
        if (project) {
            const { financial_result, operational_result, organizational_result, technical_result } = project;

            // Store individual results for display
            setIndividualResults({
                organizational: organizational_result,
                technical: technical_result,
                operational: operational_result,
                financial: financial_result
            });

            const levels = [financial_result, operational_result, organizational_result, technical_result];

            // Count each level
            const countL1 = levels.filter(level => level === 'L1').length;
            const countL2 = levels.filter(level => level === 'L2').length;
            const countL3 = levels.filter(level => level === 'L3').length;
            const countL4 = levels.filter(level => level === 'L4').length;

            // Improved status calculation logic
            let status = "";
            let percentage = 0;

            if (countL4 > 0) {
                // Any L4 makes it Not Feasible
                status = "Not Feasible";
                percentage = Math.max(0, (countL1 * 25) + (countL2 * 18) + (countL3 * 10));
            } else if (countL1 === 4) {
                // All L1 = Highly Feasible
                status = "Highly Feasible";
                percentage = 100;
            } else if (countL1 >= 2 && countL2 >= 2) {
                // Mix of L1 and L2 = Moderately Feasible
                status = "Moderately Feasible";
                percentage = (countL1 * 25) + (countL2 * 18) + (countL3 * 10);
            } else if (countL2 === 4) {
                // All L2 = Moderately Feasible
                status = "Moderately Feasible";
                percentage = 75;
            } else {
                // Everything else = Marginally Feasible
                status = "Marginally Feasible";
                percentage = (countL1 * 25) + (countL2 * 18) + (countL3 * 10);
            }

            setProjectStatus(status);
            setProjectPercentage(Math.min(100, Math.max(0, percentage)));
        }
    }, [project]);

    const statusConfig = {
        "Highly Feasible": {
            color: "from-emerald-500 to-green-600",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-700",
            icon: <CheckCircle className="w-6 h-6" />,
            borderColor: "border-emerald-200"
        },
        "Moderately Feasible": {
            color: "from-amber-500 to-yellow-600",
            bgColor: "bg-amber-50",
            textColor: "text-amber-700",
            icon: <TrendingUp className="w-6 h-6" />,
            borderColor: "border-amber-200"
        },
        "Marginally Feasible": {
            color: "from-orange-500 to-red-600",
            bgColor: "bg-orange-50",
            textColor: "text-orange-700",
            icon: <AlertTriangle className="w-6 h-6" />,
            borderColor: "border-orange-200"
        },
        "Not Feasible": {
            color: "from-red-500 to-rose-600",
            bgColor: "bg-red-50",
            textColor: "text-red-700",
            icon: <XCircle className="w-6 h-6" />,
            borderColor: "border-red-200"
        }
    };

    const categoryConfig = {
        organizational: {
            title: "Organizational Feasibility",
            icon: <Building className="w-6 h-6" />,
            color: "from-blue-500 to-indigo-600"
        },
        technical: {
            title: "Technical Feasibility",
            icon: <Settings className="w-6 h-6" />,
            color: "from-purple-500 to-violet-600"
        },
        operational: {
            title: "Operational Feasibility",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "from-green-500 to-emerald-600"
        },
        financial: {
            title: "Financial Feasibility",
            icon: <DollarSign className="w-6 h-6" />,
            color: "from-orange-500 to-red-600"
        }
    };

    const getResultLabel = (level) => {
        const labels = {
            'L1': 'Highly Feasible',
            'L2': 'Moderately Feasible',
            'L3': 'Marginally Feasible',
            'L4': 'Not Feasible'
        };
        return labels[level] || 'Unknown';
    };

    const getResultColor = (level) => {
        const colors = {
            'L1': 'text-emerald-600 bg-emerald-50 border-emerald-200',
            'L2': 'text-amber-600 bg-amber-50 border-amber-200',
            'L3': 'text-orange-600 bg-orange-50 border-orange-200',
            'L4': 'text-red-600 bg-red-50 border-red-200'
        };
        return colors[level] || 'text-gray-600 bg-gray-50 border-gray-200';
    };

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading project data...</p>
                </div>
            </div>
        );
    }

    const currentStatus = statusConfig[projectStatus] || statusConfig["Not Feasible"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl border border-orange-100 transition-all duration-300 hover:scale-105"
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Back to Dashboard</span>
                    </motion.button>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search recommendations..."
                            className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-lg border border-orange-100 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 w-80"
                        />
                    </div>
                </motion.div>

                {/* Project Overview Card */}
                <motion.div
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-100 p-8 mb-8 overflow-hidden relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{project.file_name}</h1>
                                <p className="text-gray-600">Project Feasibility Analysis Report</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Overall Status */}
                            <div className={`${currentStatus.bgColor} ${currentStatus.borderColor} border-2 rounded-2xl p-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Overall Feasibility</h3>
                                    <div className={`p-2 bg-gradient-to-r ${currentStatus.color} rounded-lg text-white`}>
                                        {currentStatus.icon}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl font-bold text-gray-900">{projectPercentage}%</div>
                                    <div className={`px-4 py-2 rounded-full font-semibold ${currentStatus.textColor} ${currentStatus.bgColor} border ${currentStatus.borderColor}`}>
                                        {projectStatus}
                                    </div>
                                </div>
                                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full bg-gradient-to-r ${currentStatus.color} transition-all duration-1000 ease-out`}
                                        style={{ width: `${projectPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Individual Results */}
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(individualResults).map(([category, result]) => (
                                    <div key={category} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`p-1 bg-gradient-to-r ${categoryConfig[category].color} rounded-lg text-white`}>
                                                {categoryConfig[category].icon}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded-full border ${getResultColor(result)}`}>
                                            {getResultLabel(result)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Object.entries(categoryConfig).map(([category, config], index) => (
                        <motion.div
                            key={category}
                            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-orange-100 p-6 hover:shadow-2xl transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 bg-gradient-to-r ${config.color} rounded-xl text-white`}>
                                    {config.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{config.title}</h3>
                                    <div className={`text-sm px-3 py-1 rounded-full border ${getResultColor(individualResults[category])}`}>
                                        {getResultLabel(individualResults[category])}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {recommendations[category][projectStatus]?.map((recommendation, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + (idx * 0.1) }}
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Recommendation = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <NavBar />
            <div className="flex flex-col flex-1 min-w-0">
                <Header />
                <div className="flex-1 overflow-auto">
                    <Body />
                </div>
            </div>
        </div>
    );
};

export default Recommendation;
