import React from 'react';

/**
 * HeroMetricsStrip
 * Modular telemetry metrics strip with hairline dividers and clean typography.
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] font-mono">
            {metrics.map((metric, idx) => (
                <div
                    key={metric.label}
                    className={`flex flex-col gap-1 ${
                        idx > 0 ? 'sm:border-l sm:border-white/[0.08] sm:pl-4' : ''
                    }`}
                >
                    <span className="text-lg sm:text-xl font-bold text-[#f5f5f5] tracking-tight">
                        {metric.value}
                    </span>
                    <span className="text-xs text-[#737373] leading-snug">
                        {metric.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default HeroMetricsStrip;
