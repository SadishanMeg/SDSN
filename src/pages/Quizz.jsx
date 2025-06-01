import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaCheckCircle, FaSpinner, FaClipboardList, FaCogs, FaBuilding, FaChartLine } from "react-icons/fa";

const FeasibilityAssessment = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Organizational Feasibility");
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(""));
  const [email, setEmail] = useState("");
  const [submittedTabs, setSubmittedTabs] = useState({
    "Organizational Feasibility": false,
    "Operational Feasibility": false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const file_name = localStorage.getItem("file_name");

  const categories = ["Organizational Feasibility", "Operational Feasibility"];
  const questionsPerPage = 5;

  const categoryInfo = {
    "Organizational Feasibility": {
      icon: FaBuilding,
      color: "from-orange-500 to-red-600",
      description: "Assess organizational alignment and strategic fit"
    },
    "Operational Feasibility": {
      icon: FaCogs,
      color: "from-orange-500 to-amber-600",
      description: "Evaluate operational capabilities and system requirements"
    }
  };

  const questions = {
    "Organizational Feasibility": [
      "How well does this project align with the organization's strategic goals?",
      "How much does the project contribute to achieving long-term organizational objectives?",
      "How supportive are the organization's senior management of this project?",
      "How aligned are the project's outcomes with the organization's mission and vision?",
      "How well does the project leverage the organization's core competencies?",
      "How do you assess the strengths of this project in relation to the organization's capabilities?",
      "How significant are the weaknesses of this project within the organization?",
      "What level of opportunity does this project present for the organization?",
      "How critical are the threats that this project might face?",
      "How effective are the organization's strategies in leveraging the project's strengths?",
      "How supportive are the key stakeholders towards this project?",
      "How significant are the concerns raised by stakeholders regarding this project?",
      "How well are stakeholder expectations managed throughout the project?",
      "How engaged are stakeholders in the project planning and execution phases?",
      "How effectively are stakeholder communications handled in this project?",
      "How compatible is the current organizational structure with the needs of the project?",
      "How well do the reporting lines support the project's implementation?",
      "How flexible is the organizational structure in accommodating project changes?",
      "How well does the organizational structure facilitate communication and collaboration for the project?",
      "How supportive are the organizational policies and procedures for the project?",
    ],
    "Operational Feasibility": [
      "How well does the current system align with operational goals?",
      "Is the current system scalable for future business growth?",
      "Does the current system meet user performance expectations?",
      "How adaptable is the current system to process changes?",
      "Is the level of automation in the current system sufficient?",
      "Does the current system provide adequate support for decision-making?",
      "How well does the system integrate with other operational systems?",
      "How effective is the current system in ensuring data accuracy?",
      "Can the current system be easily maintained by existing staff?",
      "Is there enough documentation available for the current system?",
      "How well does the current system align with regulatory requirements?",
      "Is the current system prone to frequent failures or downtime?",
      "Does the current system provide real-time access to data?",
      "How efficiently does the current system manage resources?",
      "Does the current system support collaboration among departments?",
      "How well is the current system aligned with operational best practices?",
      "Can the current system be customized to meet unique operational needs?",
      "Does the company currently have other ongoing projects that might compete for resources?",
      "Will the simultaneous management of other projects impact the success of the new system?",
      "Are there potential delays in project timelines due to resource allocation conflicts with other ongoing projects?",
    ],
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setEmail(userData.email || "");
    }
  }, []);

  useEffect(() => {
    if (submittedTabs["Organizational Feasibility"] && submittedTabs["Operational Feasibility"]) {
      navigate("/dashboard");
    }
  }, [submittedTabs, navigate]);

  const handleSelect = (index, value) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const getTabIcon = (category) => {
    return submittedTabs[category] ? (
      <FaCheckCircle className="text-green-400 ml-2" />
    ) : (
      <div className="w-5 h-5 ml-2 rounded-full border-2 border-gray-300"></div>
    );
  };

  const handleSubmit = async () => {
    const payload = {
      file_name: file_name,
      email: email,
      ans: {}
    };

    setIsLoading(true);

    answers.forEach((answer, index) => {
      payload.ans[`Q${index + 1}`] = answer || "N/A";
    });

    const apiUrl = selectedCategory === "Organizational Feasibility"
      ? "http://127.0.0.1:5000/api/organizational"
      : "http://127.0.0.1:5000/api/operational";

    try {
      await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Assessment submitted successfully!");
      setSubmittedTabs((prev) => {
        const updatedTabs = { ...prev, [selectedCategory]: true };

        if (updatedTabs["Organizational Feasibility"] && updatedTabs["Operational Feasibility"]) {
          navigate("/dashboard");
        }
        return updatedTabs;
      });
    } catch (error) {
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const displayedQuestions = questions[selectedCategory].slice(startIndex, startIndex + questionsPerPage);
  const isSubmitDisabled = answers.includes("");
  const totalPages = Math.ceil(questions[selectedCategory].length / questionsPerPage);
  const progress = ((answers.filter(answer => answer !== "").length) / 20) * 100;

  const ChangeState = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    setAnswers(Array(20).fill(""));
  };

  const getAnswerOptions = () => {
    if (selectedCategory === "Organizational Feasibility") {
      return [
        { value: "A4", label: "Not Aligned", color: "text-red-600" },
        { value: "A3", label: "Slightly Aligned", color: "text-orange-600" },
        { value: "A2", label: "Moderately Aligned", color: "text-yellow-600" },
        { value: "A1", label: "Well Aligned", color: "text-green-600" }
      ];
    } else {
      return [
        { value: "A4", label: "Low", color: "text-red-600" },
        { value: "A3", label: "Medium", color: "text-orange-600" },
        { value: "A2", label: "High", color: "text-yellow-600" },
        { value: "A1", label: "Very High", color: "text-green-600" }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                <FaClipboardList className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Feasibility Assessment
                </h1>
                <p className="text-gray-600 mt-1">Evaluate your project's viability across key dimensions</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8">

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-gray-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Categories</h3>
                {categories.map((category) => {
                  const CategoryIcon = categoryInfo[category].icon;
                  const isSelected = selectedCategory === category;
                  const isCompleted = submittedTabs[category];

                  return (
                    <button
                      key={category}
                      onClick={() => ChangeState(category)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${isSelected
                        ? `bg-gradient-to-r ${categoryInfo[category].color} text-white shadow-lg`
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CategoryIcon className={`text-xl ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                          <div className="text-left">
                            <div className="font-semibold text-sm">{category}</div>
                            <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                              {categoryInfo[category].description}
                            </div>
                          </div>
                        </div>
                        {getTabIcon(category)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${isSubmitDisabled || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  }`}
                onClick={handleSubmit}
                disabled={isSubmitDisabled || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaChartLine className="mr-2" />
                    Submit Assessment
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-8">

              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryInfo[selectedCategory].color}`}>
                    {React.createElement(categoryInfo[selectedCategory].icon, { className: "text-white text-xl" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCategory}</h2>
                    <p className="text-gray-600">{categoryInfo[selectedCategory].description}</p>
                  </div>
                </div>

                {/* Page Progress */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Page {currentPage + 1} of {totalPages}</span>
                  <span>Questions {startIndex + 1}-{Math.min(startIndex + questionsPerPage, questions[selectedCategory].length)} of {questions[selectedCategory].length}</span>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-8">
                {displayedQuestions.map((question, i) => {
                  const questionIndex = i + startIndex;
                  const currentAnswer = answers[questionIndex];

                  return (
                    <div key={questionIndex} className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                      <div className="mb-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                            Q{questionIndex + 1}
                          </span>
                          <span className="text-sm text-gray-500">Required</span>
                        </div>
                        <p className="text-lg font-medium text-gray-800 leading-relaxed">{question}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {getAnswerOptions().map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSelect(questionIndex, option.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${currentAnswer === option.value
                              ? 'border-orange-500 bg-orange-50 shadow-md'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 ${currentAnswer === option.value
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300'
                                }`}>
                                {currentAnswer === option.value && (
                                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                )}
                              </div>
                              <span className={`font-medium ${currentAnswer === option.value ? 'text-orange-700' : 'text-gray-700'
                                }`}>
                                {option.label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${currentPage === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <IoIosArrowBack className="text-xl" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${i === currentPage
                        ? 'bg-orange-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                  ))}
                </div>

                <button
                  disabled={startIndex + questionsPerPage >= questions[selectedCategory].length}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${startIndex + questionsPerPage >= questions[selectedCategory].length
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <span>Next</span>
                  <IoIosArrowForward className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeasibilityAssessment;
