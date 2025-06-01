import React from 'react'
import { FaSearch, FaThLarge, FaProjectDiagram, FaUser } from "react-icons/fa";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-5 bg-gray-100 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-gray-700">Account</h1>
                <p className="text-sm text-gray-500">08th February 2024</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 p-2 bg-white border rounded-full shadow-sm text-gray-600 focus:outline-none"
                />
            </div>
        </div>
    )
}
