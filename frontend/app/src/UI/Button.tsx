interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;    
    type?: "button" | "submit" | "reset";
    unSafeStyle?: React.CSSProperties;
    className?: string;
}
 
const Button: React.FC<ButtonProps> = ({ children, onClick, type, unSafeStyle, className }) => {
    return ( 
        <button 
            style={{...unSafeStyle}} 
            onClick={onClick} 
            type={type} 
            className={className}>
            {children}
        </button>
    );
}
 
export default Button;