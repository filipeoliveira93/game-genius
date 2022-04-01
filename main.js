var colorCodes = ["red", "green", "blue", "yellow"];
var index;
var answer = [];

function updateGame() {
	var random = Math.floor(Math.random() * 4);
	answer.push(colorCodes[random]);
	levelview(answer);
	playlevel(answer);
}
function playlevel(answer) {
	answer.forEach((color, index) => {
		setTimeout(() => {
			playSound(color);
			classlist = document.getElementById(`${color}`).classList;
			// console.log(classlist);
			classlist.add("play");
			setTimeout(() => {
				classlist.remove("play");
			}, 200);
		}, 1000 * index);
	});
}
function playSound(sound) {
	// console.log(sound);
	var soundData = document.querySelector(`audio[data-key="${sound}"]`);
	// console.log(soundData);
	soundData.currentTime = 0;
	soundData.play();
}

function levelview(data) {
	if (data.length < 10) {
		document.querySelector(".score").innerHTML = `${data.length}`;
	} else {
		document.querySelector(".score").innerHTML = ` ${data.length}`;
	}
}
function startGame() {
	answer = [];
	levelview(answer);
	updateGame();
	// console.log(answer);
	playerrun();
}
function levelUp() {
	// if (answer.length > 10)
	updateGame();
	for (i = 0; i < answer.length; i++) {}
	// console.log(answer);
}

function playerrun() {
	let button = document.querySelectorAll(".button");
	var i = 0;
	button.forEach((b) => {
		// console.log(b);
		b.addEventListener("click", (e) => {
			code = e.target.getAttribute("id");
			classlist = e.target.classList;
			if (classlist.contains("active")) {
				classlist.remove("active");
			}
			classlist.add("active");
			setTimeout(() => {
				classlist.remove("active");
			}, 200);
			// console.log(code);
			// console.log(typeof code);

			if (code == answer[i]) {
				playSound(code);

				// sounds[code].play();
				i++;
			} else {
				setTimeout(() => {
					startGame();
				}, 1000);
			}
			if (i == answer.length) {
				setTimeout(() => {
					levelUp();
				}, 2000);
				i = 0;
			}
		});
	});
}
