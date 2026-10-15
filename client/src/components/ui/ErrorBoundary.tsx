import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full my-6 p-6 rounded-2xl bg-slate-900 border border-rose-500/30 text-white shadow-xl space-y-4">
          <div className="flex items-center gap-3 text-rose-400">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <h3 className="text-lg font-bold">
              {this.props.fallbackTitle || 'Rendering Error in Subsystem Simulation'}
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {this.props.fallbackMessage ||
              'A rendering issue occurred while loading this interactive view. You can reload the view or return to the main vehicle explorer.'}
          </p>
          {this.state.error && (
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-rose-300 overflow-x-auto border border-rose-950">
              {this.state.error.message}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Rendering</span>
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
