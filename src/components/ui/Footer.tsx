import { Link as WouterLink } from "wouter";
import {
    Button,
    Link as ChakraLink,
    CloseButton,
    Dialog,
    Portal,
} from "@chakra-ui/react";
import { AiFillLinkedin } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineBranches } from "react-icons/ai";

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
                        <Dialog.Root
                            size="sm"
                            placement="center"
                            motionPreset="slide-in-bottom"
                        >
                            <Dialog.Trigger asChild>
                                <Button variant="surface" size="sm">
                                    <Icon color={"white"} size="lg">
                                        <AiOutlineBranches />
                                    </Icon>
                                    <span className="text-white">
                                        Version: 0.8.0
                                    </span>
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>
                                                Dialog Title
                                            </Dialog.Title>
                                            <Dialog.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua.
                                        </Dialog.Body>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
