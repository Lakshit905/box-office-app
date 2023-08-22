import { Link } from 'react-router-dom';

const LINK = [
  {
    name: 'Home',
    to: '/',
  },

  {
    name: 'Starred',
    to: '/Starred',
  },
];

const Navs = () => {
  return (
    <div>
      <ul>
        {LINK.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
