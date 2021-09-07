import Link from 'next/link';

const Header = ({ currentUser }) => {

  const links = [
    { label: 'Sign Up', href: '/auth/signup', labelVisibility: !currentUser },
    { label: 'Sign In', href: '/auth/signin', labelVisibility: !currentUser },
    { label: 'Sign Out', href: '/auth/signout', labelVisibility: currentUser }
  ]
    .filter(linkConfig => linkConfig.labelVisibility)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="navbar-brand text-light">{label}</a>
        </Link>
      </li>
    ))


  return (
    <nav className="navbar navbar-light bg-dark text-light">
      <Link href='/'>
        <a className="navbar-brand text-light">Ticketing</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-item-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default Header;