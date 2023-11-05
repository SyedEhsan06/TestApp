import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer items-center h-12 p-4 bg-base text-neutral-content fixed bottom-0">
      <aside className="items-center grid-flow-col">
        <a href='https://www.instagram.com/toxiccoder7/?igshid=MXN4Njc1Z2p6bGk3bQ%3D%3D' target="_blank">
          <FontAwesomeIcon icon={faInstagram} size="2x" className="cursor-pointer text-blue-500" />
        </a>
        <a href='https://github.com/SyedEhsan06' target="_blank">
          <FontAwesomeIcon icon={faGithub} size="2x" className="cursor-pointer text-blue-500" />
        </a>
        
      </aside>
    </footer>
  );
};

export default Footer;
