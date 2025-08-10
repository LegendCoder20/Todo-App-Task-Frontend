import React from "react";

function AlertBox({message}) {
  return (
    <>
      <div class="fixed top-4 right-4 z-50">
        <div
          class="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 w-auto"
          role="alert"
        >
          <svg
            class="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">{message}</div>
        </div>
      </div>
    </>
  );
}

export default AlertBox;
