import React, { useEffect, useState } from 'react';
import { getHistory } from '../api/analysis';
import { Shield, AlertTriangle, XCircle, X, ChevronRight, ArrowLeft } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import { Link } from 'react-router';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch {
                console.error("Failed to load history");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const getIcon = (type) => {
        if (type === 'Safe') return <Shield className="text-green-500" />;
        if (type === 'Suspicious') return <AlertTriangle className="text-yellow-500" />;
        return <XCircle className="text-red-500" />;
    };

    if (loading) return <div className="text-center mt-20">Loading history...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Analysis
                </Link>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-slate-800 tracking-tight">Scan History</h2>
            {history.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No scans found yet. Analyze an email to see it here!</p>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div 
                            key={item._id} 
                            onClick={() => setSelectedItem(item)}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md hover:border-blue-300 transition cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                {getIcon(item.result.classification)}
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition">{item.result.classification}</h3>
                                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 mt-1 truncate w-64 md:w-96">
                                        {item.content.substring(0, 80)}...
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <span className={`text-xl font-bold ${
                                        item.result.confidenceScore > 80 ? 'text-red-600' : 'text-blue-600'
                                    }`}>
                                        {item.result.confidenceScore}%
                                    </span>
                                    <p className="text-xs text-gray-400">Confidence</p>
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition" size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detailed Analysis Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
                    <div 
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 animate-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition text-gray-500"
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Detailed Analysis</h2>
                        <p className="text-sm text-gray-500 mb-4 font-medium italic">
                            Scanned on {new Date(selectedItem.createdAt).toLocaleString()}
                        </p>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Original Email Content</h3>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                {selectedItem.content}
                            </p>
                        </div>

                        <div className="-mt-8">
                            <ResultCard result={selectedItem.result} />
                        </div>

                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="w-full mt-6 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition shadow-lg shadow-slate-200"
                        >
                            Back to History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;