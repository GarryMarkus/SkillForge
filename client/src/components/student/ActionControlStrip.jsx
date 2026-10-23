import React from 'react';

const ActionControlStrip = ({ onStartAssessment, onReingestResume, onAccessLearning }) => {
    return (
        <section 
            className="border border-gray-100 bg-white rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-sans shadow-sm" 
            id="ActionControlStrip"
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-wrap">
                <button
                    onClick={onStartAssessment}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Take Practical Assessment</span>
                </button>
                <button
                    onClick={onReingestResume}
                    className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    <span>Update Resume &amp; Projects</span>
                </button>
                <button
                    onClick={onAccessLearning}
                    className="bg-blue-50 text-blue-700 border border-blue-100 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    <span>Explore Learning Paths</span>
                </button>
            </div>
            <div className="text-xs text-gray-500 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-3 lg:pt-0 lg:pl-6 leading-relaxed">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-gray-900">Profile Status: Active &amp; Verified</span>
                </div>
                <div className="text-gray-400 mt-0.5">Eligible for Direct Interview Fast-Track</div>
            </div>
        </section>
    );
};

export default ActionControlStrip;
