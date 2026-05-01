self.addEventListener("install", () => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker Activated");
});

self.addEventListener("message", (event) => {
  if (event.data === "LOGIN_SUCCESS_NOTIFICATION") {
    self.registration.showNotification("Healthcare App", {
      body: "Login successful!",
      icon: "/vite.svg",
    });
  }
});

self.addEventListener("message", (event) => {
  if (event.data === "LOGOUT_SUCCESS_NOTIFICATION") {
    self.registration.showNotification("Healthcare App", {
      body: "Logout successful!",
      icon: "/vite.svg",
    });
  }
});