import { Icon, Link as ChakraLink } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaRegKeyboard } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { Link as WouterLink, useLocation } from "wouter";

const Header = () => {
    const location = useLocation();
    const isHome = location[0] === "/";
    const isStats = location[0] === "/stats";

    const { t } = useTranslation();

    return (
        <header className="flex items-center justify-between w-full h-auto bg-white dark:bg-gray-800 shadow-md px-10! py-6!">
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
                                color={isHome ? "brand.400" : ""}
                                href="/"
                            >
                                <Icon size="lg">
                                    <FaRegKeyboard />
                                </Icon>
                                {t("play.label")}
                            </ChakraLink>
                        </li>
                        <li>
                            <ChakraLink
                                as={WouterLink}
                                color={isStats ? "brand.400" : ""}
                                href="/stats"
                            >
                                <Icon size="lg">
                                    <IoIosStats />
                                </Icon>
                                {t("stats.label")}
                            </ChakraLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex items-center gap-10 justify-end w-full min-w-max">
                <ChakraLink
                    as={WouterLink}
                    href="/settings"
                    className="inline-flex min-w-max"
                >
                    <IoSettingsOutline />
                </ChakraLink>

                <ChakraLink
                    as={WouterLink}
                    href="/profile"
                    className="inline-flex min-w-max"
                >
                    <IoPersonOutline />
                    {t("auth.sign_in")}
                </ChakraLink>
            </div>
        </header>
    );
};

export default Header;
