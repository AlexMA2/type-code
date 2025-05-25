import { beautifyCode } from "@utils/beautify/beautify";

export interface CodeProps {
    snippet: string;
}

const CodeSnippet = (props: CodeProps) => {
    function getNbspLines(line: string): number[] {
        const match = line.match(/^(\s+)/);
        if (!match) return [];
        return match.map((_, index) => index);
    }

    return (
        <div>
            <div className="flex flex-col text-gray-400">
                {beautifyCode(props.snippet).map((line, index) => (
                    <p key={index}>
                        {getNbspLines(line).map((nbspIndex) => (
                            <span key={nbspIndex}>&nbsp;</span>
                        ))}
                        {line}
                        <br />
                    </p>
                ))}
            </div>
        </div>
    );
};

export default CodeSnippet;
