const Menu = ({ setLineColor, setLineWidth, setLineOpacity, canvasRef, saveCanvasImage, deleteCanvasImage }) => {

	const openDialog = () => {
		const dialog = document.getElementById("download-modal");
		dialog.showModal();
	};

	const closeDialog = () => {
		const dialog = document.getElementById("download-modal");
		dialog.close();
	};

	const downloadFile = () => {
		const fileName = document.getElementById("file-name").value;
		const canvas = canvasRef.current;
		// Download logic here
		const link = document.createElement('a');
		const newFileName = fileName + '.png';

		const downloadCanvas = document.createElement('canvas');
		const downloadContext = downloadCanvas.getContext('2d');

		// Set the same width and height as the original canvas
		downloadCanvas.width = canvas.width;
		downloadCanvas.height = canvas.height;

		// Set the background color
		downloadContext.fillStyle = '#ffffff';
		downloadContext.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);

		// Draw the existing canvas onto the download canvas
		downloadContext.drawImage(canvas, 0, 0);

		link.download = newFileName;
		link.href = downloadCanvas.toDataURL('image/png');
		link.click();
	};

	return (
		<div className="Menu">
			<label>Brush Color </label>
			<input
				type="color"
				onChange={(e) => {
					setLineColor(e.target.value);
				}}
			/>
			<button
				className="rbg-buttons"
				style={{ backgroundColor: '#FF0000' }}
				onClick={() => {
					setLineColor('#FF0000');
				}}></button>
			<button
				className="rbg-buttons"
				style={{ backgroundColor: '#FF7F00' }}
				onClick={() => {
					setLineColor('#FF7F00');
				}}></button>
			<button
				className="rbg-buttons"
				style={{ backgroundColor: '#FFFF00' }}
				onClick={() => {
					setLineColor('#FFFF00');
				}}></button>
			<button
				className="rbg-buttons"
				style={{ backgroundColor: '#00FF00' }}
				onClick={() => {
					setLineColor('#00FF00');
				}}></button>
			<button
				className="rbg-buttons"
				style={{ backgroundColor: '#0000FF' }}
				onClick={() => {
					setLineColor('#0000FF');
				}}></button>
			<button
				className="rbg-buttons"
				style={{ backgroundColor: '#4B0082' }}
				onClick={() => {
					setLineColor('#4B0082');
				}}></button>

			<label>Brush Width </label>
			<input
				type="range"
				min="3"
				max="20"
				onChange={(e) => {
					setLineWidth(e.target.value);
				}}
			/>
			<label>Brush Opacity</label>
			<input
				type="range"
				min="1"
				max="100"
				onChange={(e) => {
					setLineOpacity(e.target.value / 100);
				}}
			/>
			<button type="button"
				onClick={saveCanvasImage}>Save
			</button>

			<button type="button"
				onClick={deleteCanvasImage}>Clear
			</button>

			<button
				type="button"
				onClick={openDialog}
			>
				Download
			</button>

			<dialog id="download-modal">
				<div className="modal-header">
					<h5 className="modal-title">
						File Name:
					</h5>
				</div>
				<div className="modal-body">
					<form>
						<div>
							<input
								type="text"
								id="file-name"
								placeholder="Enter file name"
							/>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						onClick={closeDialog}
					>
						Close
					</button>
					<button
						id="download-btn"
						type="button"
						onClick={downloadFile}
					>
						Download
					</button>
				</div>
			</dialog>
		</div>
	);
};

export default Menu;
