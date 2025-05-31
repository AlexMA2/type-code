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
                            color="teal.500"
                        >
                            <Icon size="lg">
                                <AiFillLinkedin />
                            </Icon>
                            LinkedIn
                        </ChakraLink>
                    </li>
                    <li>
                        <ChakraLink
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/AlexMA2"
                            color="teal.500"
                        >
                            <Icon size="lg">
                                <AiOutlineGithub />
                            </Icon>
                            GitHub
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
                                <AiOutlineMail />
                            </Icon>
                            Email
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
