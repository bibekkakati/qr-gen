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
		width: 220,
		height: 220,
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
			dataBox.className = dataBoxClassName;
		}
	};

	downloadBtn.onclick = function (e) {
		const image = qrcode.getElementsByTagName("img")[0].currentSrc;
		const filename = "QR_Code_" + Date.now() + getExtension(image);
		downloadImage(image, filename);
	};

	function markDataBoxError() {
		const prevClassName = dataBox.className;
		dataBox.className =
			prevClassName + " " + errorClassName + " " + shakeClassName;
		vibrate();
		setTimeout(() => {
			dataBox.className = prevClassName + " " + errorClassName;
		}, 500);
	}

	function generateQRCode(data) {
		QR_CODE.clear();
		QR_CODE.makeCode(data);
		qrdiv.className = qrdivClassName;
	}

	function vibrate() {
		if (Boolean(window.navigator.vibrate)) {
			window.navigator.vibrate([100, 100, 100]);
		}
	}

	function downloadImage(image, filename) {
		var element = document.createElement("a");
		element.setAttribute("href", image);
		element.setAttribute("download", filename);
		element.setAttribute("class", toHideClassName);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function getExtension(base64) {
		let extension = ".";
		if (!base64) {
			throw new Error("Base64 url is required!");
		}
		let start = false;
		for (let i = 0; i < base64.length; i++) {
			if (base64[i] == "/") {
				start = true;
			} else if (base64[i] == ";") {
				break;
			} else if (start) {
				extension += base64[i];
			}
		}
		return extension;
	}
}

main();
