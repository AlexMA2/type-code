import { useLocation, Link as WouterLink } from "wouter";
import { Link as ChakraLink, Icon, Button } from "@chakra-ui/react";
import { FaRegKeyboard } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

const Header = () => {
    const location = useLocation();
    console.log("🚀 ~ Header ~ location:", location);
    const isHome = location[0] === "/";
    const isStats = location[0] === "/stats";

    return (
        <header className="flex items-center justify-between w-full h-auto bg-white dark:bg-gray-800 shadow-md px-10! py-8!">
            <div className=" flex items-center gap-10 justify-start w-full min-w-max ">
                <div className="flex items-center justify-center ">
                    <img
                        src="src/assets/logo/logo-dark-md.svg"
                        alt="Logo"
                        className="w-24"
                    />
                </div>
                <nav className="flex items-center justify-center">
                    <ul className="flex items-center justify-center gap-4 ">
                        <li>
                            <ChakraLink
                                as={WouterLink}
                                color={isHome ? "'colors.primary'" : ""}
                                href="/"
                            >
                                <Icon size="lg">
                                    <FaRegKeyboard />
                                </Icon>
                                Play
                            </ChakraLink>
                        </li>
                        <li>
                            <ChakraLink
                                as={WouterLink}
                                color={isStats ? "#a8e425" : ""}
                                href="/stats"
                            >
                                <Icon size="lg">
                                    <IoIosStats />
                                </Icon>
                                Your stats
                            </ChakraLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <ChakraLink
                as={WouterLink}
                href="/profile"
                className="inline-flex min-w-max"
            >
                <IoPersonOutline />
                Sign in
            </ChakraLink>
        </header>
    );
};

export default Header;
