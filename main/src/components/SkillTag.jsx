import React from 'react';

const SkillTag = ({ skill, type }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  const typeClasses = type === 'offered' 
    ? "bg-green-100 text-green-800 border border-green-200" 
    : "bg-blue-100 text-blue-800 border border-blue-200";

  return (
    <span className={`${baseClasses} ${typeClasses}`}>
      {skill}
    </span>
  );
};

export default SkillTag;