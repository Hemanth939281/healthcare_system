import { AppRouter } from "./app/router";
import ErrorBoundary from "./shared/ErrorBoundary";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </div>
  );
};

export default App;
