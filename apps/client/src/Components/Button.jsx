/* eslint-disable react/prop-types */

const Button = ({ children, className }) => {
  return (
    <button
      className={`w-fit px-7 py-1 bg-[#8E0B13] text-[#FFF8F0] rounded-lg cursor-pointer hover:bg-[#C1252F] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
