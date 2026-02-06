import React, { useState } from 'react';
import { analyzeEmail, uploadEmailFile } from '../api/analysis';
import ResultCard from '../components/ResultCard';
import { ShieldAlert, Loader2, FileUp, Type } from 'lucide-react';

const Home = () => {
    const [activeTab, setActiveTab] = useState('text');
    const [emailText, setEmailText] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        setLoading(true);
        setError('');
        setResult(null);

        try {
            let data;
            if (activeTab === 'text') {
                if (!emailText.trim()) throw new Error("Please paste some email content");
                data = await analyzeEmail(emailText);
            } else {
                if (!file) throw new Error("Please select a file to upload");
                data = await uploadEmailFile(file);
            }
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
                        <ShieldAlert className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        Phish<span className="text-blue-600">Guard</span> AI
                    </h1>
                    <p className="text-slate-500 mt-2">Professional Grade Phishing Content Analysis</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    {/* Tabs Navigation */}
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setActiveTab('text')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-all ${
                                activeTab === 'text' 
                                ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-600' 
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <Type size={18} /> Paste Text
                        </button>
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold transition-all ${
                                activeTab === 'upload' 
                                ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-600' 
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <FileUp size={18} /> Upload .eml
                        </button>
                    </div>

                    {/* Input Content */}
                    <div className="p-6">
                        {activeTab === 'text' ? (
                            <textarea
                                className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-slate-50/50"
                                placeholder="Paste the suspicious email content here..."
                                value={emailText}
                                onChange={(e) => setEmailText(e.target.value)}
                            />
                        ) : (
                            <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 relative px-4 text-center">
                                <input
                                    type="file"
                                    accept=".eml,.txt"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="bg-blue-100 p-4 rounded-full mb-3 text-blue-600">
                                    <FileUp size={32} />
                                </div>
                                <p className="font-medium text-slate-700">
                                    {file ? file.name : "Click to upload or drag .eml file"}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">Supports .eml and .txt files</p>
                            </div>
                        )}
                        
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                                loading 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
                            }`}
                        >
                            {loading ? (
                                <><Loader2 className="animate-spin" /> Analyzing...</>
                            ) : (
                                "Start AI Analysis"
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Handling */}
                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
                        <ShieldAlert size={20} />
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {/* Result Section */}
                {result && (
                    <div className="mt-8 transition-all animate-in fade-in slide-in-from-bottom-4">
                        <ResultCard result={result.result} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;