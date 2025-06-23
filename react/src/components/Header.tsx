const Header = ({ title }: { title: string }) => {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "70px",
				backgroundColor: "rgb(16, 19, 22)",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h2>{title}</h2>
		</div>
	);
};

export default Header;
