import { Link } from 'react-router-dom';
import mark from '../assets/mark-128.png';
import markLight from '../assets/mark-light-128.png';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`brand${light ? ' brand-light' : ''}`} aria-label="Cortavia, home">
      <img src={light ? markLight : mark} width={56} height={56} alt="" />
      <span className="brand-word">Cortavia</span>
    </Link>
  );
}
