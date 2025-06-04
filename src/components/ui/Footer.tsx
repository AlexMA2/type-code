import { Icon, Link as ChakraLink } from "@chakra-ui/react";
import { AiFillLinkedin, AiOutlineGithub, AiOutlineMail } from "react-icons/ai";

import VersionModal from "./VersionModal";

const Footer = () => {
    const subject = "Hello! I wanna talk about your app";

    return (
        <footer className="flex items-center justify-center w-full h-16 bg-gray-800 text-white mx-auto py-4 ">
            <nav className="flex items-center  w-full  justify-between max-w-3xl min-w-min">
                <ul className="flex gap-4 ">
                    <li>
                        <ChakraLink
                            href="https://www.linkedin.com/in/alexmamani/"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Icon size="lg">
                                <AiFillLinkedin color="#086bc9" />
                            </Icon>
                            <span className="text-slate-700 dark:text-slate-100">
                                LinkedIn
                            </span>
                        </ChakraLink>
                    </li>
                    <li>
                        <ChakraLink
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/AlexMA2"
                        >
                            <Icon size="lg">
                                <AiOutlineGithub />
                            </Icon>
                            <span className="text-slate-700 dark:text-slate-100">
                                GitHub
                            </span>
                        </ChakraLink>
                    </li>
                    <li>
                        <ChakraLink
                            rel="noreferrer"
                            target="_blank"
                            href={`mailto:alex_162001@hotmail.com?subject=${subject}}`}
                            color="teal.500"
                        >
                            <Icon size="lg">
                                <AiOutlineMail color="#f84a3d" />
                            </Icon>

                            <span className="text-slate-700 dark:text-slate-100">
                                Email
                            </span>
                        </ChakraLink>
                    </li>
                </ul>
                <ul className="flex gap-4 ">
                    <li>
                        <VersionModal></VersionModal>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
