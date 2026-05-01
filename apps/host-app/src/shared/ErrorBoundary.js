import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return _jsx("h1", { children: "Something went wrong" });
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
