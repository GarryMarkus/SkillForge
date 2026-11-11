import React from 'react';

/**
 * HeroMetricsStrip
 * Modular telemetry metrics strip with understated hairline rule,
 * equal-width columns, and legible typographic hierarchy.
 */
const HeroMetricsStrip = () => {
    const metrics = [
        {
            value: '20 min',
            label: 'Average Assessment Time',
        },
        {
            value: '99.4%',
            label: 'Cosine Match Precision',
        },
        {
            value: '0.02%',
            label: 'Tamper Anomaly Rate',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.06] mt-8 font-mono">
            {metrics.map((metric, idx) => (
                <div
                    key={metric.label}
                    className={`flex flex-col ${
                        idx > 0 ? 'sm:border-l sm:border-white/[0.06] sm:pl-6' : ''
                    }`}
                >
                    <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-tight">
                        {metric.value}
                    </span>
                    <span className="text-xs text-[#737373] font-mono mt-1 leading-snug">
                        {metric.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default HeroMetricsStrip;
