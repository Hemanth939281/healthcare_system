import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { listen } from "@healthcare-mf/utils";
import ProtectedRoute from "../shared/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import toast, { Toaster } from "react-hot-toast";

const AuthApp = lazy(() => import("authApp/Auth"));
const PatientsApp = lazy(() => import("patientsApp/Patients"));
const PatientDetails = lazy(() => import("patientsApp/PatientDetails"));
const AnalyticsApp = lazy(() => import("analyticsApp/Analytics"));
const Dashboard = () => <div>Dashboard (Protected)</div>;

const AuthListener = () => {
  useEffect(() => {
    const unsubscribe = listen("auth-changed", () => {
      window.location.href = "/dashboard";
    });

    return unsubscribe;
  }, []);

  return null;
};
const ToastListener = () => {
  useEffect(() => {
    const unsubscribe = listen(
      "show-toast",
      ({
        message,
        type,
      }: {
        message: string;
        type: "success" | "error" | "loading";
      }) => {
        toast[type](message);
      },
    );
    return unsubscribe;
  }, []);
  return null;
};

const RootLayout = () => {
  return (
    <>
      <AuthListener />
      <ToastListener />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <div>Host is running</div>
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthApp />
          </Suspense>
        ),
        errorElement: <div>Auth app failed to load</div>,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients",
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <PatientsApp />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/patients/:id",
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <PatientDetails />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/analytics",
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <AnalyticsApp />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};
