import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

const UserLayout = () => {
  return (
    <Fragment>
      <header className="absolute z-[1]">
        <Header />
      </header>
      <main className="mt-[66px]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default UserLayout;
