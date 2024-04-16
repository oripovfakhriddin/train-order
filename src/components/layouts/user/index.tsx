import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

const UserLayout = () => {
  return (
    <Fragment>
      <header className=" fixed z-50 top-0 right-0 left-0 h-[72px] w-full  bg-dark-purple ">
        <Header />
      </header>
      <main className="relative top-[72px]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default UserLayout;
