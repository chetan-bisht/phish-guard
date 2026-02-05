import React, { useState } from 'react';
import { analyzeEmail } from '../api/analysis';
import ResultCard from '../components/ResultCard';
import { ShieldAlert, Loader2 } from 'lucide-react';

const Home = () => {
    const [emailText, setEmailText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!emailText.trim()) return alert("Please paste some content");
        
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await analyzeEmail(emailText);
            setResult(data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <ShieldAlert className="w-10 h-10 text-blue-600" />
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        Phish<span className="text-blue-600">Guard</span> AI
                    </h1>
                </div>

                {/* Input Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                    <textarea
                        className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Paste the email body here to analyze..."
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                    />
                    
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <><Loader2 className="animate-spin" /> Analyzing...</>
                        ) : (
                            "Check for Phishing"
                        )}
                    </button>
                </div>

                {/* Error Handling */}
                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                {/* Result Section */}
                {result && <ResultCard result={result.result} />}
            </div>
        </div>
    );
};

export default Home;