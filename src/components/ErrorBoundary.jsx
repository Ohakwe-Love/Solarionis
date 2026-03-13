import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage: error?.message || "Unexpected application error",
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Unhandled UI error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
                <div className="max-w-lg w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                    <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
                    <p className="text-sm text-zinc-300 mb-6">
                        {this.state.errorMessage}
                    </p>
                    <button
                        type="button"
                        onClick={this.handleReload}
                        className="rounded-lg bg-(--solar-gold) px-4 py-2 font-semibold text-black"
                    >
                        Reload App
                    </button>
                </div>
            </div>
        );
    }
}
