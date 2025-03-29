import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {

    const [document, setDocument] = useState<{ _id: string; title: string; createdAt: string }[]>([]);
    const navigate=useNavigate()

    // Mock data for documents
    const [documents] = useState([
        { _id: '1', title: 'Project Proposal', createdAt: '2025-03-15' },
        { _id: '2', title: 'Team Meeting Notes', createdAt: '2025-03-18' },
        { _id: '3', title: 'Design Wireframes', createdAt: '2025-03-20' },
    ]);

    useEffect(()=>{
        const fetchDoc=async()=>{
            try {
                const user=JSON.parse(localStorage.getItem('user') || '{}')
                const token=user ? user.token :null
                const {data}=await axios.get('http://localhost:3000/api/documents',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setDocument(data)
            } catch (error) {
                navigate('/')
            }
        }
    },[navigate])

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    document.map((doc)=>(
                        <div className='bg-white shadow-md rounded-lg p-4' key={doc._id}>
                            <h3 className='text-xl font-semibold'>{doc.title}</h3>
                            <p className='text-gray-600'>Created at: {new Date(doc.createdAt).toLocaleDateString()}</p>
                            <Link to={`/document/${doc._id}`} className='text-blue-500 hover:underline mt-2 block'>
                                View Document
                            </Link>
                        </div>
                    ))
                }
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
