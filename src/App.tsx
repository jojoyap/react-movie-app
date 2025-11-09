import { Outlet, useLocation } from "react-router-dom";
import Header from "./shared/Header";
import Root from "./shared/Root";
import Main from "./shared/Main";
import Footer from "./shared/Footer";

export default function App() {
  return (
    <Root>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Root>
  );
}
