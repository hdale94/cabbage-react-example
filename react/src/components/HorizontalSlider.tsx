import { InputHTMLAttributes } from "react";
import { useCabbageProperties, useCabbageState } from "cabbage-react";

const HorizontalSlider = ({
	channel,
	paramIdx,
	inputProps,
}: {
	channel: string;
	paramIdx: number;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
}) => {
	const { properties } = useCabbageProperties(channel);
	const { value, setValue } = useCabbageState<number>(channel, paramIdx);

	return (
		<div>
			{/* Label */}
			<p style={{ marginBottom: "4px" }}>{properties?.text ?? "Label"}</p>

			<input
				type="range"
				min={properties?.range?.min ?? 0}
				max={properties?.range?.max ?? 1}
				step={properties?.range?.increment ?? 0.01}
				value={value}
				onChange={(e) => setValue(e.target.valueAsNumber)}
				{...inputProps}
				style={{
					accentColor: "rgb(148, 242, 254)",
					marginTop: "20px",
					...inputProps?.style,
				}}
			/>

			{/* Displaying the value */}
			<p style={{ marginTop: "4px" }}>{value ?? 0}</p>
		</div>
	);
};

export default HorizontalSlider;
