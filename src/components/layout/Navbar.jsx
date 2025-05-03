import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-white shadow-md">
    <h1 className="text-2xl font-bold text-primary">MindTrack</h1>
    <ul className="hidden md:flex gap-6 text-muted font-medium">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/features">Features</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
);

export default Navbar;
