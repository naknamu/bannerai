import style from "./Footer.module.css"
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <span>
            <span>
            <Link href="#">Privacy Policy</Link>
            <span> • </span>
            <Link href="#">Terms of Service</Link>
            </span>
        </span>
        <span>© 2024 BannerAI. All rights reserved.</span>
        {/* <span>
            <Link href="#">FAQ</Link>
            <span> • </span>
            <Link href="#">About</Link>
            <span> • </span>
            <Link href="#">Contact</Link>
        </span> */}
      </div>
    </footer>
  );
};

export default Footer;
