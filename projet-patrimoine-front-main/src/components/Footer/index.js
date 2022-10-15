import { Link } from "react-router-dom";
import "./styles.scss";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { AiOutlinePhone } from 'react-icons/ai';

function Footer() {
  return (
    <footer>
        <div className="footer-contact">
          <p>Nous contacter <HiOutlineArrowNarrowRight /></p> 
          <ul>
          <li><AiOutlineMail /></li>
          <li><FiFacebook /></li>
          <li><FiTwitter /></li>
          <li><AiOutlineMessage /></li>
          <li><AiOutlinePhone /></li>
          </ul>
        </div>

        <div className="footer-legalNotice">
          <Link to="/mentions-legales">Mentions Légales</Link>
        </div>
      
    </footer>
  );
}

export default Footer;
