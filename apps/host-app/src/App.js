import { jsx as _jsx } from "react/jsx-runtime";
import { AppRouter } from "./app/router";
import ErrorBoundary from "./shared/ErrorBoundary";
const App = () => {
    return (_jsx("div", { children: _jsx(ErrorBoundary, { children: _jsx(AppRouter, {}) }) }));
};
export default App;
