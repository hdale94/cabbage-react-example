import { useCabbageProperties } from "cabbage-react";
import "./App.css";
import Header from "./components/Header";
import HorizontalSlider from "./components/HorizontalSlider";
import RangeSlider from "./components/RangeSlider";
import RotarySlider from "./components/RotarySlider";

function App() {
	const { properties } = useCabbageProperties("MainForm");

	return (
		<div
			style={{
				width: properties?.size?.width ?? 500,
				height: properties?.size?.height ?? 400,
				backgroundColor: "rgb(66, 73, 89)",
			}}
		>
			<Header title={"Cabbage React"} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "16px",
				}}
			>
				<div style={{ display: "flex", gap: "64px" }}>
					<RotarySlider channel={"Feedback"} paramIdx={0} />
					<HorizontalSlider channel={"Cutoff"} paramIdx={1} />
				</div>
				<div style={{ display: "flex", gap: "64px" }}>
					<RangeSlider
						channelStart={"HighPass"}
						paramIdxStart={2}
						channelEnd={"LowPass"}
						paramIdxEnd={3}
					/>
					<RotarySlider
						channel={"Mix"}
						paramIdx={4}
						circleProps={{ fill: "white" }}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
