declare module './ErrorBoundary.jsx' {
  import * as React from 'react';

  interface ErrorBoundaryProps {
    children: React.ReactNode;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
  }

  class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: any): ErrorBoundaryState | null;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
  }

  export default ErrorBoundary;
}
