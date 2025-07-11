import React, { useState, useRef, useEffect } from "react";
import { useCabbageProperties, useCabbageState } from "cabbage-react";

interface RangeSliderProps {
	channelStart: string;
	paramIdxStart: number;
	channelEnd: string;
	paramIdxEnd: number;
	width?: number;
	height?: number;
}

const RangeSlider = ({
	channelStart,
	paramIdxStart,
	channelEnd,
	paramIdxEnd,
	width = 200,
}: RangeSliderProps) => {
	const { properties: startProperties } = useCabbageProperties(channelStart);
	const { properties: endProperties } = useCabbageProperties(channelEnd);

	const { value: valueStart, setValue: setValueStart } =
		useCabbageState<number>(channelStart, paramIdxStart);
	const { value: valueEnd, setValue: setValueEnd } = useCabbageState<number>(
		channelEnd,
		paramIdxEnd
	);

	// Refs for the SVG elements
	const svgRef = useRef<SVGSVGElement | null>(null);
	const startHandleRef = useRef<SVGCircleElement | null>(null);
	const endHandleRef = useRef<SVGCircleElement | null>(null);

	// Mouse drag state
	const [dragging, setDragging] = useState<"start" | "end" | null>(null);

	const min = startProperties?.range?.min ?? 0;
	const max = endProperties?.range?.max ?? 1;

	const handleMouseDown = (
		e: React.MouseEvent<SVGCircleElement>,
		handle: "start" | "end"
	) => {
		setDragging(handle);
		e.preventDefault();
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging) {
			// Added fallback to these values for testing UI during development
			const start = Number(valueStart ?? 0);
			const end = Number(valueEnd ?? 1);

			const svg = svgRef.current;
			if (!svg) return;

			const svgRect = svg.getBoundingClientRect();
			const mouseX = e.clientX - svgRect.left;

			// Clamp the mouse position between 0 and the slider's width
			const clampedPosition = Math.max(0, Math.min(mouseX, width));
			const newValue = (clampedPosition / width) * (max - min) + min;

			if (dragging === "start" && newValue <= end) {
				setValueStart(newValue);
			} else if (dragging === "end" && newValue >= start) {
				setValueEnd(newValue);
			}
		}
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	// Calculate the position of the handles based on the values
	const scaleValueToPosition = (value: number) => {
		return ((value - min) / (max - min)) * width;
	};

	// Attach mouse event listeners
	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [dragging]);

	const startPosition = scaleValueToPosition(valueStart ?? min);
	const endPosition = scaleValueToPosition(valueEnd ?? max);

	return (
		<div
			style={{
				display: "flex",
				width: width,
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* Label */}
			<p style={{ marginBottom: "4px" }}>{startProperties?.text ?? "Label"}</p>

			<svg
				ref={svgRef}
				width={width + 20} // Increase SVG width to accommodate handles
				height={20} // Increase SVG height to accommodate handles
			>
				{/* Track (Line) */}
				<line
					x1={10} // Adjust to provide space for the left handle
					y1={10} // Adjust to center vertically within the increased height
					x2={width + 10} // Increase width to accommodate handles on both sides
					y2={10}
					stroke={"rgb(53, 60, 74)"}
					strokeWidth="8"
					strokeLinecap="round"
				/>
				{/* Start Handle */}
				<circle
					ref={startHandleRef}
					cx={startPosition + 10} // Shift handle position within new space
					cy={10} // Adjust vertical position to center
					r="8"
					fill={"rgb(141, 243, 120)"}
					onMouseDown={(e) => handleMouseDown(e, "start")}
					onMouseEnter={() => (startHandleRef.current!.style.opacity = "1")}
					onMouseLeave={() => (startHandleRef.current!.style.opacity = "0.8")}
				/>
				{/* End Handle */}
				<circle
					ref={endHandleRef}
					cx={endPosition + 10} // Shift handle position within new space
					cy={10} // Adjust vertical position to center
					r="8"
					fill={"rgb(141, 243, 120)"}
					onMouseDown={(e) => handleMouseDown(e, "end")}
					onMouseEnter={() => (endHandleRef.current!.style.opacity = "1")}
					onMouseLeave={() => (endHandleRef.current!.style.opacity = "0.8")}
				/>
			</svg>

			{/* Displaying the range */}
			<p style={{ marginTop: "4px" }}>
				<span>
					{valueStart} - {valueEnd}
				</span>
			</p>
		</div>
	);
};

export default RangeSlider;
