import { DetailedHTMLProps, InputHTMLAttributes, SVGProps } from "react";
import { useCabbageProperties, useCabbageState } from "cabbage-react";

interface RotarySliderProps {
	channel: string;
	paramIdx: number;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	outerContainerProps?: DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
	svgContainerProps?: SVGProps<SVGSVGElement>;
	circleProps?: SVGProps<SVGCircleElement>;
}

const RotarySlider = ({
	channel,
	paramIdx,
	inputProps,
	outerContainerProps,
	svgContainerProps,
	circleProps,
}: RotarySliderProps) => {
	const { properties } = useCabbageProperties(channel);
	const { value, setValue } = useCabbageState<number>(channel, paramIdx);
	const valueAsNumber = value ?? 0;

	const min = properties?.range?.min ?? 0;
	const max = properties?.range?.max ?? 1;

	const diameter = 50; // Diameter of the outer circle
	const svgSize = diameter * 0.9; // Size of the SVG container
	const svgRadius = svgSize / 2;
	const circleRadius = 4; // Radius of the indicator circle

	// Calculate the angle based on the value
	const offset = 90;
	const availableRotationRange = 360 - offset;
	const angleInDegrees =
		(valueAsNumber / max) * availableRotationRange + offset / 2;

	// Calculate the circle position based on angle and the shrunk SVG size
	const calculateCirclePositions = (angleInDegrees: number) => {
		const angleInRadians = (angleInDegrees * Math.PI) / 180;
		return {
			x: svgRadius + (svgRadius - circleRadius) * Math.cos(angleInRadians),
			y: svgRadius + (svgRadius - circleRadius) * Math.sin(angleInRadians),
		};
	};

	const { x: circleX, y: circleY } = calculateCirclePositions(angleInDegrees);

	return (
		<div style={{ width: "54px" }}>
			{/* Label */}
			<p style={{ marginBottom: "4px" }}>{properties?.text ?? "Label"}</p>

			<div
				{...outerContainerProps}
				style={{
					position: "relative",
					width: `${diameter}px`,
					height: `${diameter}px`,
					borderRadius: "50%",
					border: "2px solid rgb(16, 19, 22)",
					overflow: "hidden",
					backgroundColor: "rgb(53, 60, 74)",
					...outerContainerProps?.style,
				}}
			>
				{/* SVG square container for circle */}
				<svg
					width={svgSize}
					height={svgSize}
					{...svgContainerProps}
					style={{
						position: "absolute",
						top: `${(diameter - svgSize) / 2}px`,
						left: `${(diameter - svgSize) / 2}px`,
						transform: "rotate(90deg)",
						...svgContainerProps?.style,
					}}
				>
					{/* Circle indicating current value*/}
					<circle
						cx={circleX}
						cy={circleY}
						r={circleRadius}
						fill={"rgb(226, 107, 110)"}
						{...circleProps}
					/>
				</svg>
				{/* Slider input to control the progress */}
				<input
					type="range"
					min={min}
					max={max}
					step="0.01"
					value={value}
					onChange={(e) => setValue(e.target.valueAsNumber)}
					{...inputProps}
					style={{
						writingMode: "vertical-lr",
						rotate: "180deg",
						position: "absolute",
						width: "100%",
						height: "100%",
						left: "0",
						opacity: 0,
						...inputProps?.style,
					}}
				/>
			</div>

			{/* Displaying the value */}
			<p style={{ marginTop: "4px" }}>{value ?? 0}</p>
		</div>
	);
};

export default RotarySlider;
