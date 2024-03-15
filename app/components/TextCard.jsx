import React from "react";

const TextCard = ({ text }) => {
  return (
    <div className="lg:w-full sm:w-1/2 md:w-1/3">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 h-23 lg:h-full shadow-orange-100">
        <p className="text-sm lg:text-lg text-center justify-items-center">{text}</p>
      </div>
    </div>
  );
};

export default TextCard;
