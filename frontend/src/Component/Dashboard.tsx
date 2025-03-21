import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    // Mock data for documents
    const [documents] = useState([
        { _id: '1', title: 'Project Proposal', createdAt: '2025-03-15' },
        { _id: '2', title: 'Team Meeting Notes', createdAt: '2025-03-18' },
        { _id: '3', title: 'Design Wireframes', createdAt: '2025-03-20' },
    ]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div key={doc._id} className="bg-white shadow-md rounded-lg p-5 flex flex-col">
                        <h3 className="text-xl font-semibold">{doc.title}</h3>
                        <p className="text-gray-500 text-sm">Created on: {new Date(doc.createdAt).toLocaleDateString()}</p>
                        <Link to={`/document/${doc._id}`} className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-md text-center hover:bg-blue-700 transition">
                            Open Document
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button 
                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
                    onClick={() => navigate('/document/new')}
                >
                    Create New Document
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
