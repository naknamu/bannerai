import React from 'react';
import style from './Navbar.module.css'; // Import the CSS Module

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <a href="#" className={style.navbarBrand}>BannerAI</a>
        <ul className={style.navbarNav}>
          <li className={style.navItem}><a href="#home" className={style.navLink}>Home</a></li>
          <li className={style.navItem}><a href="#about" className={style.navLink}>About</a></li>
          <li className={style.navItem}><a href="#contact" className={style.navLink}>Contact</a></li>
          <li className={style.navItem}><a href="#services" className={style.navLink}>FAQ</a></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
