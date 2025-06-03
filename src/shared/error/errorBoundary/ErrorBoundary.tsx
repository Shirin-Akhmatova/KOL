import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: false
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Обнаружена ошибка:", error, errorInfo);
        this.setState({ error: true });
    }

    render(): ReactNode {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;