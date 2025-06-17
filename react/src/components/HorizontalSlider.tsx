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
			<input
				type="range"
				min={properties?.range?.min ?? 0}
				max={properties?.range?.max ?? 1}
				step={properties?.range?.increment ?? 0.01}
				value={value}
				onChange={(e) => setValue(e.target.valueAsNumber)}
				{...inputProps}
				style={{
					accentColor: "rgb(147,210,0)",
					...inputProps?.style,
				}}
			/>

			{/* Displaying the value */}
			<p style={{ margin: 0 }}>{value ?? 0}</p>
		</div>
	);
};

export default HorizontalSlider;
