import React from 'react';

/**
 * Global React Error Boundary
 * Catches unhandled JavaScript exceptions in child component trees,
 * logs the incident, and displays a graceful, minimal recovery interface.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error('[SkillForge ErrorBoundary] Caught unhandled runtime error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#050505] text-[#ededed] font-mono flex items-center justify-center p-4 sm:p-6 select-none">
                    <div className="max-w-lg w-full bg-[#0b0b0c] border border-white/10 rounded-md shadow-2xl p-6 sm:p-8 space-y-5">
                        <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                            <div className="w-8 h-8 rounded-sm bg-[#111113] text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                                [!]
                            </div>
                            <div>
                                <h1 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
                                    [ runtime exception caught ]
                                </h1>
                                <p className="text-xs text-[#737373]">
                                    An unexpected rendering fault occurred
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-[#888888] leading-relaxed">
                            The application intercepted an unhandled fault. Workspace data and active sessions remain preserved in telemetry storage.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={this.handleReload}
                                className="flex-1 bg-[#111113] hover:bg-[#1a1a1d] text-white border border-white/20 font-mono text-xs px-4 py-2 rounded-md shadow-sm transition cursor-pointer text-center"
                            >
                                [ Reload Session ]
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="flex-1 bg-[#050505] hover:bg-[#111113] border border-white/10 text-[#888888] hover:text-white font-mono text-xs px-4 py-2 rounded-md transition cursor-pointer text-center"
                            >
                                [ Retry Render ]
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="w-full bg-transparent hover:text-white text-[#555555] font-mono text-xs py-1.5 transition cursor-pointer text-center"
                            >
                                &larr; Return to SkillForge Home
                            </button>
                        </div>

                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-4 pt-3 border-t border-white/[0.06] text-left">
                                <summary className="text-[11px] font-mono text-[#555555] hover:text-[#888888] cursor-pointer select-none">
                                    [developer diagnostic stack]
                                </summary>
                                <div className="mt-2 p-3 bg-[#050505] border border-white/10 rounded-sm text-xs font-mono text-rose-300 overflow-x-auto whitespace-pre-wrap max-h-48">
                                    <p className="font-bold mb-1">{this.state.error.toString()}</p>
                                    <p className="text-[#737373] text-[11px]">{this.state.errorInfo?.componentStack}</p>
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
