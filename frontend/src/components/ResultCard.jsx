import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';

const ResultCard = ({ result }) => {
    if (!result) return null;
    
    const { classification, confidenceScore, redFlags, analysis, actionSteps } = result;

    const getStatusStyles = () => {
        if (classification === 'Safe') return { color: 'text-green-600', bg: 'bg-green-50', icon: <ShieldCheck className="w-8 h-8 text-green-600" /> };
        if (classification === 'Suspicious') return { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: <AlertTriangle className="w-8 h-8 text-yellow-600" /> };
        return { color: 'text-red-600', bg: 'bg-red-50', icon: <XCircle className="w-8 h-8 text-red-600" /> };
    };

    const styles = getStatusStyles();

    return (
        <div className={`mt-8 p-6 rounded-xl border ${styles.bg} shadow-sm animate-in fade-in duration-500`}>
            <div className="flex items-center gap-4 mb-4">
                {styles.icon}
                <div>
                    <h2 className={`text-2xl font-bold ${styles.color}`}>{classification}</h2>
                    <p className="text-sm font-medium text-gray-600">Confidence Score: {confidenceScore}%</p>
                </div>
            </div>

            <p className="text-gray-700 mb-4 italic">"{analysis}"</p>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2 underline">Red Flags Found:</h3>
                    {redFlags.length === 0 ? (
                        <p className="text-sm text-green-600 font-medium">✓ No red flags found - everything looks good!</p>
                    ) : (
                        <ul className="list-disc ml-5 space-y-1">
                            {redFlags.map((flag, i) => (
                                <li key={i} className="text-sm text-gray-700">{flag}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2 underline">What should you do?</h3>
                    <ul className="list-disc ml-5 space-y-1">
                        {actionSteps.map((step, i) => (
                            <li key={i} className="text-sm text-gray-700">{step}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;