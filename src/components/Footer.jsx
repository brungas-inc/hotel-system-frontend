import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 px-16 border-t border-grey-200 font-light flex flex-col lg:flex-row justify-between items-center">
      <p className="text-grey-700 mb-6 lg:mb-0">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://www.brungasinc.com"
          target="_blank"
          rel="noreferrer"
          className="text-amber-700 hover:text-light-blue-700"
        >
          Init Inc
        </a>
      </p>

      <ul className="list-unstyled flex">
        <li className="mr-6">
          <a
            className="text-grey-700 hover:text-grey-900 font-medium block text-sm"
            target="_blank"
            rel="noreferrer"
            href="https://www.brungasinc.com/"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            className="text-grey-700 hover:text-grey-900 font-medium block text-sm"
            target="_blank"
            rel="noreferrer"
            href="https://www.brungasinc.com/contact-us"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
