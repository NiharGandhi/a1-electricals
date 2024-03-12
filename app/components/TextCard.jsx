import React from "react";

const TextCard = ({ text }) => {
  return (
    <div className="lg:w-full sm:w-1/2 md:w-1/3 p-4">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 h-32 lg:h-full">
        <p className="text-sm lg:text-lg text-center justify-items-center">{text}</p>
      </div>
    </div>
  );
};

export default TextCard;
