import { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-dark-purple py-3">
        <div className="container">
          <h1 className="text-center text-white">
            Copyright © 2024 of Fakhriddin Developer
          </h1>
          <h2 className="text-center text-orange-400">
            <Link to={"tel: +998906949416"}>{`+998 (90) 694 94 16 `}</Link>
          </h2>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
