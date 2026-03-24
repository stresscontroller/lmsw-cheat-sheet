import React from "react";
import { createRoot } from "react-dom/client";

import { Alert } from "@heroui/react";

import { AlertProps } from "@/types";

let alertTimeout: NodeJS.Timeout | null = null;


export const ShowAlert = ({ message, type, duration = 5000, description }: AlertProps) => {
  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }

  const alertContainer = document.getElementById("alert-container");
  if (alertContainer) {
    alertContainer.innerHTML = "";
    const alertElement = document.createElement("div");
    alertElement.id = "alert";
    alertElement.className = "fixed top-28 right-4 z-50 shadow-lg rounded-lg";

    const root = createRoot(alertElement);
    root.render(<Alert color={type} title={message} description={description}
    />
    );
    alertContainer.appendChild(alertElement);

    alertTimeout = setTimeout(() => {
      alertContainer.removeChild(alertElement);
    }, duration);
  }
};
