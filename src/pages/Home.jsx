import React, { useState, useEffect } from "react";
import image1 from "../assets/images/bg.jpg";
import HDimg from "../assets/images/header.png";
import step1Image from "../assets/images/sideIMG1.jpg";
import { Upload, ArrowRight, CheckCircle2, FileText, BarChart3, User, Zap, Shield, Target, TrendingUp, Star, Award, Users, Clock, Building, Settings, DollarSign } from "lucide-react";
import step2Image from "../assets/images/sideIMG2.png";
import step3Image from "../assets/images/sideIMG3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import samplePDF from "../assets/template.pdf";

const Header = () => {
    const [loggedUser, setLoggedUser] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email) {
            setLoggedUser(user);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 lg:px-12 py-4 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-orange-100'
                : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                className="flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                <div className="relative">
                    <img src={HDimg} alt="Logo" className="w-14 h-14 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-gray-900 via-orange-500 to-red-600 bg-clip-text text-transparent">
                    SDSN
                </span>
            </motion.div>

            <div className="flex items-center gap-6">
                {loggedUser.email ? (
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 p-0.5 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-600" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-gray-900 font-semibold">{loggedUser.name || "User"}</p>
                            <p className="text-gray-500 text-sm">Welcome back!</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.button
                                onClick={() => window.location.href = '/dashboard'}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl font-medium transition-all duration-300 hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Dashboard
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                                className="px-6 py-3 bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl font-medium transition-all duration-300 hover:bg-gray-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                ) : (
                    <motion.button
                        onClick={() => window.location.href = '/login'}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl font-medium transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                )}
            </div>
        </motion.header>
    );
};

const WhyChooseUs = () => {
    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast Analysis",
            description: "Get comprehensive feasibility reports in minutes, not days. Our AI-powered system processes your project data instantly.",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Enterprise-Grade Security",
            description: "Your project data is protected with bank-level encryption and secure cloud infrastructure.",
            color: "from-blue-400 to-indigo-500"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Precision Accuracy",
            description: "Advanced algorithms ensure 95%+ accuracy in feasibility predictions based on thousands of successful projects.",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Smart Insights",
            description: "Get actionable recommendations and risk assessments to make informed project decisions.",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Team Collaboration",
            description: "Share reports and collaborate with stakeholders through our intuitive dashboard interface.",
            color: "from-cyan-400 to-blue-500"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "24/7 Availability",
            description: "Access your feasibility analysis anytime, anywhere with our cloud-based platform.",
            color: "from-red-400 to-orange-500"
        }
    ];

    const stats = [
        { number: "10K+", label: "Projects Analyzed", icon: <BarChart3 className="w-6 h-6" /> },
        { number: "95%", label: "Accuracy Rate", icon: <Target className="w-6 h-6" /> },
        { number: "500+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
        { number: "24/7", label: "Support", icon: <Clock className="w-6 h-6" /> }
    ];

    return (
        <motion.section
            className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-500 to-red-600 bg-clip-text text-transparent mb-6">
                        Why Choose SDSN?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Transform your project planning with AI-powered feasibility analysis.
                        Join thousands of successful businesses making smarter decisions.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-orange-100"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-500"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Project Planning?</h3>
                        <p className="text-xl mb-8 opacity-90">Join thousands of successful businesses making data-driven decisions</p>
                        <motion.button
                            onClick={() => document.getElementById("step1").scrollIntoView({ behavior: "smooth" })}
                            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Your Free Analysis
                            <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

const Step1Download = () => {
    return (
        <motion.div
            id="step1"
            className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-100 p-8 md:p-16 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/5 to-red-500/5 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">1</span>
                                Step 1
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                                Download Project Proposal Template
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                Get started with our comprehensive, industry-standard project proposal template.
                                Designed by experts to capture all essential project details for accurate feasibility analysis.
                            </p>

                            <div className="space-y-6 mb-10">
                                {[
                                    { text: "Download the professional template", icon: <FileText className="w-5 h-5" /> },
                                    { text: "Fill out all required project fields", icon: <CheckCircle2 className="w-5 h-5" /> },
                                    { text: "Save as PDF format for upload", icon: <Upload className="w-5 h-5" /> }
                                ].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100"
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                                            {step.icon}
                                        </div>
                                        <p className="text-gray-700 font-medium text-lg">{step.text}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.a
                                    href={samplePDF}
                                    download="Project_Proposal_Template.pdf"
                                    className="group bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl text-lg font-bold text-center transition-all duration-300 flex items-center justify-center gap-3"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FileText className="w-6 h-6" />
                                    Download Template
                                </motion.a>
                                <motion.button
                                    onClick={() => document.getElementById("step2").scrollIntoView({ behavior: "smooth" })}
                                    className="group bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl text-lg font-bold transition-all duration-300 hover:bg-orange-50 flex items-center justify-center gap-3"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Next Step
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur-2xl opacity-20 scale-105"></div>
                                <img
                                    src={step1Image}
                                    alt="Template Preview"
                                    className="relative w-full rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Step2Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const userData = JSON.parse(storedUser);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setMessage("");
        } else {
            setMessage("Please select a valid PDF file.");
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === "application/pdf") {
                setSelectedFile(file);
                setMessage("");
            } else {
                setMessage("Please select a valid PDF file.");
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a PDF file to upload.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", selectedFile.name.replace(".pdf", ""));
        formData.append("email", userData.email);

        try {
            await axios.post("http://127.0.0.1:5000/fields/technical", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await axios.post("http://127.0.0.1:5000/fields/financial", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            localStorage.setItem('file_name', selectedFile.name.replace(".pdf", ""));
            toast.success("File uploaded successfully!");
            document.getElementById("step3").scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            setMessage("Upload failed. Please try again.");
            console.error("Upload error:", error);
        }
        setUploading(false);
    };

    return (
        <motion.div
            id="step2"
            className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-red-50/30 py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-100 p-8 md:p-16 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-orange-500/5 to-red-500/5 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">2</span>
                                Step 2
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                                Upload Your Project Proposal
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                Upload your completed project proposal form. Our AI-powered system will analyze the document
                                and extract key information for comprehensive feasibility assessment.
                            </p>

                            <div className="space-y-6 mb-10">
                                {[
                                    { text: "Complete the downloaded template", icon: <CheckCircle2 className="w-5 h-5" /> },
                                    { text: "Save as PDF format for upload", icon: <FileText className="w-5 h-5" /> },
                                    { text: "Upload and let AI analyze your project", icon: <Upload className="w-5 h-5" /> }
                                ].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100"
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                                            {step.icon}
                                        </div>
                                        <p className="text-gray-700 font-medium text-lg">{step.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`relative bg-gradient-to-br from-white/80 to-orange-50/50 backdrop-blur-lg border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${dragActive
                                    ? 'border-orange-500 bg-orange-50/80 scale-105'
                                    : selectedFile
                                        ? 'border-green-400 bg-green-50/50'
                                        : 'border-orange-200 hover:border-orange-400'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="mb-8">
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedFile
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                        : 'bg-gradient-to-r from-orange-500 to-red-600'
                                        }`}>
                                        {selectedFile ? (
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        ) : (
                                            <Upload className="w-10 h-10 text-white" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {selectedFile ? selectedFile.name : "Drop your PDF here"}
                                    </h3>
                                    <p className="text-gray-600 text-lg">
                                        {selectedFile ? "File ready for upload" : "or click to browse from your computer"}
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />

                                {!selectedFile && (
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl text-lg font-bold cursor-pointer transition-all duration-300 hover:scale-105"
                                    >
                                        Choose File
                                    </label>
                                )}

                                {message && (
                                    <motion.div
                                        className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <p className="text-red-600 font-medium">{message}</p>
                                    </motion.div>
                                )}

                                {selectedFile && (
                                    <div className="mt-8 space-y-4">
                                        <motion.button
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl text-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            whileHover={{ scale: uploading ? 1 : 1.02 }}
                                            whileTap={{ scale: uploading ? 1 : 0.98 }}
                                        >
                                            {uploading ? (
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Analyzing Document...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-3">
                                                    <Upload className="w-6 h-6" />
                                                    Upload & Analyze
                                                </div>
                                            )}
                                        </motion.button>

                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="w-full bg-white text-gray-600 border-2 border-gray-200 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                                        >
                                            Choose Different File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Step3Quizz = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate("/quiz");
    };

    const quizCategories = [
        {
            title: "Organizational Feasibility",
            description: "Assess organizational readiness and stakeholder alignment",
            icon: <Building className="w-6 h-6" />,
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-50",
            questions: "8 Questions"
        },
        /*{
            title: "Technical Feasibility",
            description: "Evaluate technical requirements and infrastructure",
            icon: <Settings className="w-6 h-6" />,
            color: "from-purple-500 to-violet-600",
            bgColor: "bg-purple-50",
            questions: "10 Questions"
        },*/
        {
            title: "Operational Feasibility",
            description: "Review operational capacity and workflow integration",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-50",
            questions: "7 Questions"
        },
        /*{
            title: "Financial Feasibility",
            description: "Analyze budget, ROI, and financial sustainability",
            icon: <DollarSign className="w-6 h-6" />,
            color: "from-orange-500 to-red-600",
            bgColor: "bg-orange-50",
            questions: "9 Questions"
        }*/
    ];

    return (
        <motion.div
            id="step3"
            className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-orange-50/30 py-24 px-4 sm:px-6 md:px-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-100 p-8 md:p-16 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500/5 to-red-500/5 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">3</span>
                                Step 3
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                                Feasibility Assessment Quizzes
                            </h2>
                            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                                Complete our comprehensive assessment across four key areas. Each quiz is designed to
                                evaluate different aspects of your project's feasibility with precision and accuracy.
                            </p>
                        </motion.div>

                        {/* Quiz Categories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {quizCategories.map((category, index) => (
                                <motion.div
                                    key={index}
                                    className={`${category.bgColor} border border-orange-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl text-white shadow-lg`}>
                                            {category.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                                            <p className="text-gray-600 mb-3 leading-relaxed">{category.description}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-500">{category.questions}</span>
                                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                                <span className="text-sm font-medium text-gray-500">~5 minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white">
                                <h3 className="text-3xl font-bold mb-4">Ready to Assess Your Project?</h3>
                                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                                    Complete all four assessments to get your comprehensive feasibility report with
                                    actionable insights and recommendations.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <motion.button
                                        onClick={handleStartQuiz}
                                        className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <BarChart3 className="w-6 h-6" />
                                        Start Assessment
                                        <ArrowRight className="w-6 h-6" />
                                    </motion.button>
                                    <div className="flex items-center gap-2 text-white/80">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span>Takes only 20 minutes</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Footer = () => {
    const footerLinks = {
        product: [
            { name: "Features", href: "#why-choose" },
            { name: "Download Template", href: "#step1" },
            { name: "Upload Project", href: "#step2" },
            { name: "Take Assessment", href: "#step3" },
            { name: "Pricing", href: "#" }
        ],
        company: [
            { name: "About Us", href: "#" },
            { name: "Our Team", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Contact", href: "#" },
            { name: "Blog", href: "#" }
        ],
        support: [
            { name: "Help Center", href: "#" },
            { name: "Documentation", href: "#" },
            { name: "API Reference", href: "#" },
            { name: "Community", href: "#" },
            { name: "Status", href: "#" }
        ],
        legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "GDPR", href: "#" }
        ]
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-orange-500/5 to-red-500/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            className="flex items-center gap-4 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <img src={HDimg} alt="SDSN Logo" className="w-16 h-16 rounded-2xl shadow-xl" />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-white via-orange-400 to-red-500 bg-clip-text text-transparent">
                                    SDSN
                                </span>
                                <p className="text-gray-400 text-sm">Project Feasibility Platform</p>
                            </div>
                        </motion.div>
                        <motion.p
                            className="text-gray-300 leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            Empowering businesses worldwide with AI-driven project feasibility analysis.
                            Make smarter decisions, reduce risks, and accelerate your project success.
                        </motion.p>

                        {/* Social Links */}
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {[
                                { icon: faFacebook, color: "hover:bg-blue-600", label: "Facebook" },
                                { icon: faInstagram, color: "hover:bg-pink-600", label: "Instagram" },
                                { icon: faWhatsapp, color: "hover:bg-green-600", label: "WhatsApp" },
                                { icon: faEnvelope, color: "hover:bg-orange-600", label: "Email" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                                    whileHover={{ y: -2 }}
                                    aria-label={social.label}
                                >
                                    <FontAwesomeIcon icon={social.icon} size="lg" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * (categoryIndex + 1) }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-bold text-white mb-6 capitalize">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <motion.div
                    className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-lg border border-orange-500/20 rounded-2xl p-8 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                            <p className="text-gray-300">Get the latest insights on project feasibility and business intelligence.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[250px]"
                            />
                            <motion.button
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="pt-8 border-t border-gray-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-center md:text-left">
                            © {new Date().getFullYear()} SDSN. All rights reserved. Built with ❤️ for better project decisions.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green-400" />
                                SSL Secured
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                GDPR Compliant
                            </span>
                            <span className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400" />
                                99.9% Uptime
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

const HeroSection = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${image1})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-orange-900/40"></div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl animate-spin-slow"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-20">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-medium">Trusted by 10,000+ Projects Worldwide</span>
                        <Award className="w-5 h-5 text-yellow-400" />
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <span className="block">Transform Your</span>
                        <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                            Project Planning
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Harness the power of AI-driven feasibility analysis to make smarter decisions,
                        reduce risks, and accelerate your project success with unprecedented accuracy.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <motion.button
                            onClick={() => document.getElementById("step1").scrollIntoView({ behavior: "smooth" })}
                            className="group bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-5 rounded-2xl shadow-2xl text-lg font-bold transition-all duration-300 hover:shadow-orange-500/25"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center gap-3">
                                Start Free Analysis
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={() => document.getElementById("why-choose").scrollIntoView({ behavior: "smooth" })}
                            className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white px-10 py-5 rounded-2xl shadow-lg text-lg font-bold transition-all duration-300 hover:bg-white/20"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center gap-3">
                                Learn More
                                <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <div className="flex items-center gap-2 text-white">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="font-medium">No Credit Card Required</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <span className="font-medium">Enterprise Security</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="font-medium">Instant Results</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ProjectPlanning = () => {
    return (
        <div className="relative bg-white">
            <Header />
            <HeroSection />
            <div id="why-choose">
                <WhyChooseUs />
            </div>
            <Step1Download />
            <Step2Upload />
            <Step3Quizz />
            <Footer />
        </div>
    );
};

export default ProjectPlanning;
