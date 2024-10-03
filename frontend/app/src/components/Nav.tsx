import Button from "@/UI/Button";
import Flex from "@/UI/Flex";
import Navbar from "@/UI/Nav";
import Link from "next/link";

const Nav: React.FC = () => {
    return ( 
        <Navbar className="bg-gradient-to-r from-indigo-500 to-indigo-200 text-white p-4">
            <Flex className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">Booking System</Link>
              <Button className="text-white rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold outline-none hover:bg-indigo-500
             transition-all duration-300">
                <Link href="/new-booking">
                    New Booking
                </Link>
              </Button>
            </Flex>
          </Navbar>        
     );
}
 
export default Nav;