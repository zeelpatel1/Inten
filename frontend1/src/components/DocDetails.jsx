import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../service/docservice';
import { io } from 'socket.io-client';

const DocDetails = () => {
  const socket = io('http://localhost:3000');

  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocumentById(id);
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
      } catch (error) {
        setError('Failed to fetch document');
      }
    };
    fetchDocument();
  }, [id]);

  useEffect(() => {
    socket.emit('joinDocument', id);

    socket.on('receiveUpdate', (updatedData) => {
      if (updatedData.title) setTitle(updatedData.title);
      if (updatedData.content) setContent(updatedData.content);
    });

    socket.on('receiveUpdatedTitle', (updatedContent) => {
      setContent(updatedContent);
    });

    return () => socket.disconnect();
  }, [id, socket]);

  const handleUpdate = async () => {
    try {
      await updateDocument(id, { title, content });
      socket.emit('documentUpdate', { documentId: id, title, content });
      setSuccessMessage('Document updated successfully!');
      navigate(`/document/${id}`);
    } catch (error) {
      setError('Failed to update document');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(id);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to delete document');
    }
  };

  if (error) {
    return <div className="text-red-600 bg-red-100 p-4 rounded-lg mt-4 text-center">{error}</div>;
  }

  if (!document) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {message && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">{message}</div>}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Document Details</h2>

      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            socket.emit('documentUpdate', { documentId: id, title: e.target.value, content });
          }}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
          Content:
        </label>
        <textarea
          id="content"
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            socket.emit('documentUpdate', { documentId: id, title, content: e.target.value });
          }}
        />
      </div>

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">
          {successMessage}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Update Document
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Delete Document
        </button>
      </div>
    </div>
  );
};

export default DocDetails;
