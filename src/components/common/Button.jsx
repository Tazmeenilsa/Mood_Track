const Button = ({ children, onClick, variant = "primary", className = "" }) => {
    const baseStyles = "px-5 py-2 rounded-full font-medium transition duration-200";
    const variants = {
      primary: "bg-primary text-white hover:bg-indigo-700",
      secondary: "bg-accent text-black hover:bg-yellow-400",
      outline: "border border-primary text-primary hover:bg-indigo-100",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  