import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
            <Header />
            <main>{children}</main>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
