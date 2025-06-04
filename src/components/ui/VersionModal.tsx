import { useVersion } from "@/hooks/useVersion";
import {
    Button,
    CloseButton,
    Dialog,
    Icon,
    Link as ChakraLink,
    Portal,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AiOutlineBranches } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";

export interface Commit {
    type: string;
    message: string;
    user: string;
    id: string;
}

export interface Changes {
    features: Commit[];
    fixes: Commit[];
    refactor: Commit[];
}

const VersionModal = () => {
    const changes = {
        features: [
            {
                type: "language",
                message: "add viossa",
                fixer: "TryOmar",
                id: "6571",
            },
        ],
        fixes: [
            {
                type: "theme",
                message:
                    "dark note and reduced-motion not replacing letters with circles ",
                fixer: "fehmer",
                id: "6589",
            },
        ],
        refactor: [
            {
                type: "chore",
                message: "correct text in difficulty settings descriptions",
                fixer: "byseif21",
                id: "6811",
            },
        ],
    };
    const { t } = useTranslation();

    const version = useVersion();

    return (
        <Dialog.Root
            size="sm"
            placement="center"
            motionPreset="slide-in-bottom"
        >
            <Dialog.Trigger asChild>
                <Button variant="surface" color="brand.500" size="sm">
                    <Icon color="white" size="lg">
                        <AiOutlineBranches />
                    </Icon>
                    <span className="text-white">
                        {" "}
                        {t("version.label")}: {version}
                    </span>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title className="text-primary-500">
                                {t("version.label")}: {version}
                            </Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            {Object.entries(changes).map(([key, value]) => (
                                <div className="mb-4" key={key}>
                                    <h5 className="text-primary-500">
                                        {t(`${key}.label`)}
                                    </h5>
                                    {value.map((commit) => (
                                        <p key={commit.id}>
                                            <span className="!font-semibold">
                                                {" "}
                                                - {commit.type}: &nbsp;
                                            </span>
                                            <span className=" text-secondary-300">
                                                {commit.message}
                                            </span>
                                            <ChakraLink
                                                href={
                                                    "https://github.com/" +
                                                    commit.fixer
                                                }
                                                rel="noreferrer"
                                                target="_blank"
                                                color="teal.500"
                                            >
                                                &nbsp;(@{commit.fixer}
                                                <Icon size="xs">
                                                    <FaExternalLinkAlt />
                                                </Icon>
                                                )
                                            </ChakraLink>
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default VersionModal;
