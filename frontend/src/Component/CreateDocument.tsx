import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDocument = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSave = () => {
        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }

        // Mock saving process (you can replace this with an API call later)
        const newDocument = {
            _id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString(),
        };

        console.log('Document Created:', newDocument);

        // Redirect to the dashboard
        navigate('/dashboard');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Create New Document</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Title</label>
                <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter document title..."
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Content</label>
                <textarea 
                    className="w-full border border-gray-300 rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your document content here..."
                />
            </div>

            <div className="flex justify-between">
                <button 
                    className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
                    onClick={() => navigate('/dashboard')}
                >
                    Cancel
                </button>

                <button 
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                    onClick={handleSave}
                >
                    Save Document
                </button>
            </div>
        </div>
    );
};

export default CreateDocument;
