/* eslint-disable react/prop-types */

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`w-fit px-7 py-1 bg-btn-primary text-[#FFF8F0] rounded-lg cursor-pointer hover:bg-btn-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
