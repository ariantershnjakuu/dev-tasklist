interface TextProps {
    children: React.ReactNode;
    className?: string;
}
 
const Text: React.FC<TextProps> = ({ children, className } ) => {
        return ( 
            <p className={`text-3xl font-bold mb-6 ${className}`}>
                {children}
            </p>
        );
}
 
export default Text;