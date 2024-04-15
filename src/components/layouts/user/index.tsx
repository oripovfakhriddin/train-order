import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

const UserLayout = () => {
  return (
    <Fragment>
      <header className="top-0 fixed z-[1] h-[72px] w-full  bg-dark-purple ">
        <Header />
      </header>
      <main className="relative">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default UserLayout;
