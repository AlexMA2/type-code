import { LanguageCode } from "@/services/CodeService/Code.model";
import { LS_SETTINGS } from "@/utils/constants";
import { Language } from "@/utils/languages/Language";
import {
    Button,
    createListCollection,
    HStack,
    Portal,
    Select,
    Slider,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { useLocalStorage } from "react-use";

export interface SettingsForm {
    game: {
        codeLanguage: LanguageCode[];
        characterRange: number[];
    };
    editor: {
        fontSize: number;
    };
    mode: "light" | "dark";
    language: Language[];
}

const Settings = () => {
    const codeLanguages = createListCollection({
        items: [
            { label: "TypeScript", value: LanguageCode.TypeScript },
            { label: "JavaScript", value: LanguageCode.JavaScript },
            { label: "Python", value: LanguageCode.Python },
            { label: "Java", value: LanguageCode.Java },
            { label: "C#", value: LanguageCode.CSharp },
            { label: "C++", value: LanguageCode.CPlusPlus },
            { label: "Go", value: LanguageCode.Go },
            { label: "Ruby", value: LanguageCode.Ruby },
            { label: "PHP", value: LanguageCode.PHP },
            { label: "Swift", value: LanguageCode.Swift },
            { label: "Kotlin", value: LanguageCode.Kotlin },
        ],
    });

    const languages = createListCollection({
        items: [
            { label: "languages.english", value: Language.ENGLISH },
            { label: "languages.spanish", value: Language.SPANISH },
            { label: "languages.french", value: Language.FRENCH },
        ],
    });

    const sliderMarks = [
        { value: 50, label: "50" },
        { value: 200, label: "200" },
        { value: 350, label: "350" },
        { value: 500, label: "500" },
    ];

    const { t } = useTranslation();
    const [value, setValue] = useLocalStorage<SettingsForm>(LS_SETTINGS);

    const [initialState, setInitialState] = useState<SettingsForm | undefined>(
        undefined,
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue: formSetValue,
        control,
        reset,
    } = useForm<SettingsForm>({
        defaultValues: {
            game: {
                codeLanguage: [LanguageCode.JavaScript],
                characterRange: [50, 500],
            },
            editor: {
                fontSize: 16,
            },
            mode: "dark",
            language: [Language.ENGLISH],
        },
    });

    const onCancel = () => {
        reset(initialState);
    };

    const onSave = () => {
        handleSubmit(
            (data) => {
                setValue(data);
                setInitialState(data);

                console.log("🚀 ~ onSave ~ data:", data);
            },
            (error) => {
                console.error(error);
            },
        )();
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col w-full max-w-2xl my-6 gap-4  bg-gray-800 p-6">
                {/* Languages selector */}
                <Controller
                    control={control}
                    name="language"
                    render={({ field }) => (
                        <Select.Root
                            multiple={false}
                            variant={"subtle"}
                            collection={languages}
                            value={field.value}
                            onValueChange={(value) =>
                                field.onChange(value.value)
                            }
                        >
                            <Select.HiddenSelect />
                            <Select.Label>
                                {" "}
                                {t("languages.label")}{" "}
                            </Select.Label>
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText
                                        placeholder={t("languages.label")}
                                    />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {languages.items.map((language) => (
                                            <Select.Item
                                                item={language}
                                                key={language.value}
                                            >
                                                {language.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    )}
                ></Controller>

                {/* Languages code selector */}
                <div className="flex flex-row w-full justify-center items-center">
                    <Controller
                        control={control}
                        name="game.codeLanguage"
                        render={({ field }) => (
                            <Select.Root
                                multiple
                                variant={"subtle"}
                                collection={codeLanguages}
                                value={field.value}
                                onValueChange={(e) => {
                                    field.onChange(e.value);
                                }}
                            >
                                <Select.HiddenSelect />
                                <Select.Label>
                                    {" "}
                                    {t("languages.code")}{" "}
                                </Select.Label>
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText
                                            placeholder={t("languages.code")}
                                        />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content>
                                            {codeLanguages.items.map(
                                                (language) => (
                                                    <Select.Item
                                                        item={language}
                                                        key={language.value}
                                                    >
                                                        {language.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ),
                                            )}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        )}
                    ></Controller>
                    <Button
                        className="mt-6"
                        variant="outline"
                        onClick={() => {
                            formSetValue("game.codeLanguage", []);
                        }}
                    >
                        <FaTimes />
                    </Button>
                </div>

                {/* Character range slider */}

                <Controller
                    control={control}
                    name="game.characterRange"
                    render={({ field }) => (
                        <Slider.Root
                            step={10}
                            min={50}
                            max={500}
                            value={field.value}
                            onValueChange={(e) => {
                                field.onChange(e.value);
                            }}
                        >
                            <HStack justify="space-between">
                                <Slider.Label>
                                    {t("characters.range")}
                                </Slider.Label>

                                {t("characters.between", {
                                    min: field.value[0],
                                    max: field.value[1],
                                })}
                            </HStack>
                            <Slider.Control>
                                <Slider.Track bg={"gray.100"}>
                                    <Slider.Range bg={"brand.500"} />
                                </Slider.Track>
                                <Slider.Thumbs
                                    bg={"white"}
                                    borderColor={"brand.500"}
                                    borderWidth={4}
                                />
                                <Slider.Marks marks={sliderMarks} />
                            </Slider.Control>
                        </Slider.Root>
                    )}
                ></Controller>

                <div className="mt-6 flex flex-row justify-end gap-4 w-full">
                    <Button
                        type="button"
                        className="mt-6"
                        variant="solid"
                        onClick={onCancel}
                    >
                        {t("cancel.label")}
                    </Button>

                    <Button
                        type="button"
                        className="mt-6"
                        variant="solid"
                        onClick={() => {
                            onSave();
                        }}
                    >
                        {t("save.label")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
