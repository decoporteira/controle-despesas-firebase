import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/login" className=" hover:text-gray-400">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" className=" hover:text-gray-400">
            Register
          </Link>
        </li>
        <li>
          <Link to="/" className=" hover:text-gray-400">
            Área Protegida
          </Link>
        </li>
      </ul>
    </nav>
  );
}
