import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;

        const { data } = await axios.get('http://localhost:3000/api/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(data);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
        navigate('/');
      }
    };

    fetchDocuments();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc._id} className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{doc.title}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Created on: {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/document/${doc._id}`}
                className="mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Open Document
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
            onClick={() => navigate('/document/new')}
          >
            Create New Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
