import { Menu } from '../../components/Menu/Menu'
import { Footer } from '../../components/Footer/Footer';

import './styles.scss';

import { Outlet } from 'react-router-dom';

export function Default () {
  return (
    <div className="default">
        <Menu />
        <Outlet />
        <Footer />
    </div>
  );
}