import React from 'react';

/**
 * Global React Error Boundary
 * Catches unhandled JavaScript exceptions in child component trees,
 * logs the incident, and displays a graceful, user-friendly recovery interface.
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
                <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans flex items-center justify-center p-4 sm:p-6">
                    <div className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">error_outline</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                                    Something went wrong
                                </h1>
                                <p className="text-xs text-gray-500">
                                    An unexpected application error occurred
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            We ran into an unexpected problem while loading this section. Your account data and progress remain secure. You can try refreshing the page or returning to the home screen.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={this.handleReload}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition cursor-pointer text-center"
                            >
                                Reload page
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl transition cursor-pointer text-center"
                            >
                                Try again
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="w-full bg-transparent hover:bg-gray-100 text-gray-500 font-medium text-xs px-4 py-2 rounded-lg transition cursor-pointer text-center"
                            >
                                Return to SkillForge Home
                            </button>
                        </div>

                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-4 pt-4 border-t border-gray-100 text-left">
                                <summary className="text-xs font-semibold text-gray-400 hover:text-gray-600 cursor-pointer select-none">
                                    Developer diagnostic details
                                </summary>
                                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap max-h-48">
                                    <p className="font-bold text-red-600 mb-1">{this.state.error.toString()}</p>
                                    <p className="text-gray-500">{this.state.errorInfo?.componentStack}</p>
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
