import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import toast from "react-hot-toast";
import { emit } from "@healthcare-mf/utils";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validationSchema: isLogin
      ? Yup.object({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Min 6 characters")
            .required("Password is required"),
        })
      : Yup.object({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Min 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords do not match")
            .required("Please confirm password"),
        }),
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (isLogin) {
          const res = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password,
          );
          const token = await res.user.getIdToken();
          localStorage.setItem("token", token);
          if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
              registration.active?.postMessage("LOGIN_SUCCESS_NOTIFICATION");
            });
          }
          emit("show-toast", { message: "Login successful", type: "success" });
          setTimeout(() => emit("auth-changed"), 500);
        } else {
          await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password,
          );
          toast.success("Account created! Please log in.");
          setIsLogin(true);
          formik.resetForm();
        }
      } catch (err: any) {
        const messages: Record<string, string> = {
          "auth/user-not-found": "No account found with this email",
          "auth/wrong-password": "Incorrect password",
          "auth/invalid-credential": "Invalid email or password",
          "auth/email-already-in-use": "Email already registered",
          "auth/too-many-requests": "Too many attempts. Try again later",
        };
        toast.error(messages[err.code] || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    formik.resetForm();
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Reset link sent! Check your email.");
      setForgotPassword(false);
      setResetEmail("");
    } catch (err: any) {
      const messages: Record<string, string> = {
        "auth/user-not-found": "No account found with this email",
        "auth/too-many-requests": "Too many attempts. Try again later",
      };
      toast.error(messages[err.code] || "Something went wrong");
    } finally {
      setResetLoading(false);
    }
  };

  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-1">Forgot Password</h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter your email and we'll send a reset link
          </p>

          <input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            disabled={resetLoading}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            onClick={handleForgotPassword}
            disabled={resetLoading}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-60"
          >
            {resetLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            <button
              type="button"
              onClick={() => {
                setForgotPassword(false);
                setResetEmail("");
              }}
              className="text-blue-500 hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl mb-1 font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isLogin ? "Welcome back" : "Create your account"}
        </p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
          className="w-full border p-2 mb-1 rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs text-red-500 mb-2">{formik.errors.email}</p>
        )}

        <div className="relative mb-1">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
            className="w-full border p-2 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-red-500 mb-2">{formik.errors.password}</p>
        )}

        {isLogin && (
          <div className="text-right mb-2">
            <button
              type="button"
              onClick={() => setForgotPassword(true)}
              className="text-xs text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {!isLogin && (
          <>
            <div className="relative mb-1">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
                className="w-full border p-2 rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-xs text-red-500 mb-2">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded mt-2 disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={handleToggle}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
