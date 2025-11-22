"use client";

import React, { useState } from 'react';

const SuggestionsView = ({ onUseSuggestion }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate AI generation
        setTimeout(() => {
            const type = document.getElementById('suggestionType').value;
            const topic = document.getElementById('suggestionTopic').value;
            const audience = document.getElementById('suggestionAudience').value;
            const tone = document.getElementById('suggestionTone').value;

            const newSuggestions = [
                {
                    title: `${type} - Option 1`,
                    content: `Engage your ${audience} with this compelling ${tone.toLowerCase()} message about ${topic}. This approach focuses on building connection and driving action through clear, impactful communication.`,
                    score: 95
                },
                {
                    title: `${type} - Option 2`,
                    content: `A ${tone.toLowerCase()} take on ${topic} designed specifically for ${audience}. This version emphasizes benefits and creates urgency while maintaining authenticity.`,
                    score: 88
                },
                {
                    title: `${type} - Option 3`,
                    content: `This ${tone.toLowerCase()} content piece about ${topic} speaks directly to ${audience}. It balances information with emotion to create memorable engagement.`,
                    score: 82
                }
            ];
            setSuggestions(newSuggestions);
            setLoading(false);
        }, 1000);
    };

    return (
        <div id="suggestionsView" className="view active">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Content Suggestions</h2>
                <p className="text-gray-600">Get intelligent content recommendations powered by AI</p>
            </div>

            <div className="card mb-6">
                <h3 className="card-title mb-4">Generate Suggestions</h3>
                <form id="suggestionForm" className="space-y-4" onSubmit={handleGenerate}>
                    <div>
                        <label className="form-label">Content Type</label>
                        <select id="suggestionType" className="form-input">
                            <option>Social Media Post</option>
                            <option>Email Campaign</option>
                            <option>Blog Article</option>
                            <option>Ad Copy</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Topic or Theme</label>
                        <input type="text" id="suggestionTopic" className="form-input" placeholder="e.g., Summer sale, Product launch, Brand awareness" />
                    </div>
                    <div>
                        <label className="form-label">Target Audience</label>
                        <input type="text" id="suggestionAudience" className="form-input" placeholder="e.g., Young professionals, Tech enthusiasts" />
                    </div>
                    <div>
                        <label className="form-label">Tone</label>
                        <select id="suggestionTone" className="form-input">
                            <option>Professional</option>
                            <option>Casual</option>
                            <option>Playful</option>
                            <option>Inspirational</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? (
                            <span className="loading mr-2"></span>
                        ) : (
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a3 3 0 11-6 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                        )}
                        {loading ? 'Generating...' : 'Generate Suggestions'}
                    </button>
                </form>
            </div>

            <div id="suggestionsList" className="space-y-4">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="suggestion-card">
                        <div className="suggestion-card-header">
                            <div>
                                <h4 className="suggestion-card-title">{suggestion.title}</h4>
                                <div className="text-sm text-gray-500">AI Score: {suggestion.score}/100</div>
                            </div>
                        </div>
                        <div className="suggestion-card-body">{suggestion.content}</div>
                        <div className="suggestion-card-footer">
                            <button onClick={() => onUseSuggestion(suggestion.title, suggestion.content)} className="btn-primary text-sm">Use This</button>
                            <button onClick={handleGenerate} className="btn-secondary text-sm">Regenerate</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestionsView;
