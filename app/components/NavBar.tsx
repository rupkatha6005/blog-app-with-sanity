import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function NavBar() {
  return (
    <nav className="bg-black opacity-90	 text-white shadow-md fixed top-0 left-0 right-0 mb-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-white hover:text-gray-300">
          KafkaBlogs
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href={"/"} className="hover:text-gray-300">
            Home
          </Link>
          <Link href={"#"} className="hover:text-gray-300">
            About
          </Link>

          <Link href={"#"} className="hover:text-gray-300">
            <ModeToggle />
          </Link>
        </div>
      </div>
    </nav>
  );
}
