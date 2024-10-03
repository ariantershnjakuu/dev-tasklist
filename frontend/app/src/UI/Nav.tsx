interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}
 
const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
    return ( 
        <nav className={className}>
            {children}
        </nav>
    );
}
 
export default Navbar;