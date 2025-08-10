import React from "react";

function Button({color = "blue", type = "button", children, onClick}) {
  const colorVariants = {
    blue: "from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-blue-800/80",
    yellow:
      "from-yellow-600 via-yellow-600 to-yellow-600 focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-yellow-500/50 dark:shadow-yellow-800/80",
    green:
      "from-green-500 via-green-600 to-green-700 focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-green-800/80",
    red: "from-red-500 via-red-600 to-red-700 focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-red-800/80",
  };
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        class={`text-white bg-gradient-to-r ${colorVariants[color]} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 `}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
