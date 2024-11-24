import { Logo } from '../Logo/Logo';

import './styles.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer--logo">
        <Logo />
      </div>
      <div className="footer--author">
        <div className="footer--author__row"><b>Nome</b>: Leonardo de Souza Batista - <b>RA</b>: 9332323844</div>
        <div className="footer--author__row"><b>Nome</b>: Kayann Gabriel Justino Uoya - <b>RA</b>: 9332111006</div>

      </div>
    </footer>
  );
}