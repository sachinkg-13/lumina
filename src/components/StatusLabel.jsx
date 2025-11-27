import React, { useEffect, useState } from "react";

const StatusLabel = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 w-full p-3 z-50 text-center text-white transition-all duration-300 ${
                isOnline ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ display: isOnline ? "none" : "block" }}
        >
            {isOnline ? "Back Online" : "No Internet Connection"}
        </div>
    );
};

export default StatusLabel;
