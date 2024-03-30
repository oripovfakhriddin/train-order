import { Fragment } from "react/jsx-runtime";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const UserLayout = () => {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main className="mt-16">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default UserLayout;
