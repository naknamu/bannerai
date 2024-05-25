import Image from "next/image";
import style from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <Link href="/" className={style.navbarBrand}>
          <Image
            src={"/static/images/logo/icon.png"}
            alt="BannerAI logo"
            width={50}
            height={50}
            priority
          />
          <span>BannerAI</span>
        </Link>
        <ul className={style.navbarNav}>
          <li className={style.navItem}>
            <a href="#home" className={style.navLink}>
              Home
            </a>
          </li>
          <li className={style.navItem}>
            <a href="#about" className={style.navLink}>
              About
            </a>
          </li>
          <li className={style.navItem}>
            <a href="#contact" className={style.navLink}>
              Contact
            </a>
          </li>
          <li className={style.navItem}>
            <a href="#services" className={style.navLink}>
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
