function main() {
	const generateBtn = document.getElementById("generateBtn");
	const dataBox = document.getElementById("dataBox");
	const downloadBtn = document.getElementById("downloadBtn");
	const qrcode = document.getElementById("qrcode");
	const qrdiv = document.getElementById("qrdiv");

	const errorClassName = "error";
	const shakeClassName = "shake";
	const dataBoxClassName = "dataBox";
	const toHideClassName = "hide";
	const qrdivClassName = "qrdiv";

	var QR_CODE = new QRCode("qrcode", {
		width: 260,
		height: 260,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
	});

	generateBtn.onclick = function (e) {
		const data = dataBox.value;
		if (data) {
			generateQRCode(data);
		} else {
			markDataBoxError();
		}
	};

	dataBox.onfocus = function (e) {
		const classList = dataBox.classList;

		if (classList.contains(errorClassName)) {
			// Removing error class
			dataBox.className = dataBoxClassName;
		}
	};

	downloadBtn.onclick = function (e) {
		// Image tag
		const img = qrcode.getElementsByTagName("img")[0];
		// Canvas tag
		const canvas = qrcode.getElementsByTagName("canvas")[0];

		// Padding to QRCode
		const padding = 40;

		// Adding padding to width and height
		canvas.width = canvas.width + padding;
		canvas.height = canvas.height + padding;

		// Canvas context
		const context = canvas.getContext("2d");
		// Clearing previous content
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Making the background white
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, canvas.width, canvas.height);
		// Adding the image of QRCode
		// x and y are padding / 2
		context.drawImage(img, padding / 2, padding / 2);

		// Getting base64 url
		const image = canvas.toDataURL("image/png", 1);
		const filename = "QR_Code_" + Date.now() + ".png";
		downloadImage(image, filename);
	};

	function markDataBoxError() {
		const prevClassName = dataBox.className;
		dataBox.className =
			prevClassName + " " + errorClassName + " " + shakeClassName;
		vibrate();
		setTimeout(() => {
			// Reset class
			dataBox.className = prevClassName + " " + errorClassName;
		}, 500);
	}

	function generateQRCode(data) {
		QR_CODE.clear();
		QR_CODE.makeCode(data);
		// Show QRCode div
		qrdiv.className = qrdivClassName;
	}

	function vibrate() {
		if (Boolean(window.navigator.vibrate)) {
			window.navigator.vibrate([100, 100, 100]);
		}
	}

	function downloadImage(image, filename) {
		// Creating hidden <a> tag to download
		var element = document.createElement("a");
		element.setAttribute("href", image);
		element.setAttribute("download", filename);
		element.setAttribute("class", toHideClassName);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}

main();
