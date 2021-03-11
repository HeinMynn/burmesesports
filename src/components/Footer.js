import React from "react";
import { FaHeart } from "react-icons/fa";

function Footer(props) {
  return (
    <div className="footer">
      Made with <FaHeart className="heart" /> By{" "}
      <a
        href="https://idigitalnews.com"
        target="_blank"
        rel="noreferrer"
        className="footer-title"
      >
        iDigital News
      </a>
    </div>
  );
}

export default Footer;
