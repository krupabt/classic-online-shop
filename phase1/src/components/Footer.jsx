import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 ClassicShop. All rights reserved.</p>
      <p>
        Built with ❤️ using React
      </p>
      <div className="social-icons">
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaYoutube /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaFacebook /></a>
      </div>
    </footer>
  );
}

export default Footer;
