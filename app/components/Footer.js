import style from "./Footer.module.css"
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <span>
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
          <span> • </span>
          <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>
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
