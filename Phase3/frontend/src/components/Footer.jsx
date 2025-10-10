import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 ClassicShop. All rights reserved.</p>
      <p>
        Built with ❤ using React
      </p>
      <div className="social-icons">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
      </div>
    </footer>
  );
}

export default Footer;