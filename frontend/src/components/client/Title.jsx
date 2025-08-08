import React from "react";

const Title = ({ title, discription }) => {
  return (
    <div className="text-center mb-10 max-w-xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-gray-500 mt-2">{discription}</p>
    </div>
  );
};

export default Title;
