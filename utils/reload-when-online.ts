"use client";

import { useEffect } from "react";

export default function useReloadWhenOnline() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Refresh the page when the tab becomes visible
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}