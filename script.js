var H = 20;
var W = 10;

let mat = [];
let score = 0;
let lvl = "lako";

var tip = [
	[["0", "0", "0", "0"],
	 ["", "", "", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]], 
	[["1", "", "", ""],
	 ["1", "1", "1", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]],
	[["", "", "2", ""],
	 ["2", "2", "2", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]],
	[["3", "3", "", ""],
	 ["3", "3", "", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]],
	[["", "4", "4", ""],
	 ["4", "4", "", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]],
	[["", "5", "", ""],
	 ["5", "5", "5", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]],
	[["6", "6", "", ""],
	 ["", "6", "6", ""],
   	 ["", "", "", ""],
	 ["", "", "", ""]]
];

let clr = [
	"blue",
	"darkblue",
	"orange",
	"yellow",
	"green",
	"purple",
	"red"
];

function init(){
	$("#start").hide();

	for(i = 0; i < H; i++){
		let P = []
		for(j = 0; j < W; j++)P.push("");
		mat.push(P);
	}

	let s = "";
	for(i = 0; i < H; i++){
		s += '<tr>';
		for(j = 0; j < W; j++){
			let id = i * W + j;
			s += '<td id="' + id + '">'
			s += '</td>'
		}
		s += '</tr>';
	}
	$("#t").append(s);

}

function print(){
	for(i = 0; i < H; i++){
		for(j = 0; j < W; j++){
			let id = i * W + j;
			if(mat[i][j] == ""){
				$("#" + id).css("background-color", "white");
			}
			else{
				let boja = clr[parseInt(mat[i][j])];
				$("#" + id).css("background-color", boja);
			}
		}
	}
}

function pokusajStaviti(obj, x, y){
	// console.log("mat: ");
	// console.log(mat);

	let br = 0;
	for(i = x; i < Math.min(H, x + 4); i++){
		for(j = y; j < Math.min(W, y + 4); j++){
			if(obj[i - x][j - y] == "")continue;
			if(mat[i][j] != "")return false;
			br++;
		}
	}

	return (br == 4);

}

function stavi(obj, x, y){
	
	for(i = x; i < Math.min(H, x + 4); i++){
		for(j = y; j < Math.min(W, y + 4); j++){
			if(obj[i - x][j - y] == "")continue;
			mat[i][j] = obj[i - x][j - y];
		}
	}

}

function izbrisi(obj, pX, pY){
	// console.log("brisem: ");
	// console.log(obj);
	
	for(i = pX; i < Math.min(H, pX + 4); i++){
		for(j = pY; j < Math.min(W, pY + 4); j++){
			if(obj[i - pX][j - pY] == "")continue;
			mat[i][j] = "";
		}
	}

}

function rotacijaDesno(obj){

	const result = obj.map((row, i) =>
		row.map((val, j) => obj[3 - j][i])
	);

	return result;
}

function popravi(obj){

	let nw = [];
	for(i = 0; i < 4; i++){

		let ok = true;
		for(j = 0; j < 4; j++)if(obj[i][j] != "")ok = false;

		if(ok == false){
			// console.log("i: " + i);
			for(j = i; j < 4; j++)nw.push(obj[j]);
			for(j = 0; j < i; j++)nw.push(["", "", "", ""]);
			break;
		}

	}

	let res = [["", "", "", ""],
	 		   ["", "", "", ""],
   	           ["", "", "", ""],
	 		   ["", "", "", ""]];
	for(j = 0; j < 4; j++){

		let ok = true;
		for(i = 0; i < 4; i++)if(nw[i][j] != "")ok = false;

		if(ok == false){
			console.log("j: " + j);
			for(l = 0; l < 4; l++){
				for(i = j; i < 4; i++){
					res[l][i - j] = nw[l][i];
				}
			}

			console.log(res);

			break;
		}
	
	}


	return res;

}

function get(){
	return parseInt(Math.random() * 7);
}

function ocistiLinije(){
	let P = []
	for(j = 0; j < W; j++)P.push("");

	let br = 0;
	for(i = 0; i < H; i++){

		let ok = true;
		for(j = 0; j < W; j++)if(mat[i][j] == "")ok = false;

		if(ok == true){
			mat[i] = P;
			br++;
		}

	}


	for(i = H - 2; i > 0; i--){
		if(mat[i] != P && mat[i + 1] == P){
			let tmp = mat[i];
			mat[i] = mat[i + 1];
			mat[i + 1] = tmp;
		}
	}

	score += br;

	console.log(mat);

}

function gotovo(){
	$("table").hide();

	$("#kraj").css("display", "initial");

}

function calc(sle){
	let obj = tip[sle];

	let s = '<table>';
	for(i = 0; i < 4; i++){
		s += '<tr>';
		for(j = 0; j < 4; j++){
			
			s += '<td ';
			if(obj[i][j] != ""){
				// style="background-color: color;"
				s += 'style="background-color: ' + clr[sle] + ';"';
			}
			else{
				s += 'style="background-color: ' + "white" + ';"';
			}

			s += '></td>'
		}
		s += '</tr>';
	}

	s += '</table>'

	console.log(s);

	return s;

}

let radio;

let L;
function init_limit(){
	if(radio == "lako")L = 15;
	else if(radio == "srednje")L = 10;
	else if(radio == "tesko")L = 5;
}

function limit(){
	return Math.max(2, L - parseInt(score / 10));
}

// mozda namestim ovo popravi da pribije objekat i uz levu ivicu -> namestio

let x, y, obj;
function igra(){

	let sle = get();

	function radi(){
		document.getElementById("score").innerHTML = score;

		x = 0; y = 0;
		obj = tip[sle];

		sle = get(); 
		document.getElementById("sledeci").innerHTML = calc(sle);

		// ovaj setIterval moze sa requestAnimationFrame
		// let interval = setInterval(function(){
		// 	if(pokusajStaviti(obj, x, y) == false){
		// 		console.log("Zavrsio");
				
		// 		if(x == 0){
		// 			// GAME OVER
		// 			window.location.href = "index-end.html"; 
		// 		}
		// 		else{
		// 			stavi(obj, x - 1, y);
		// 			ocistiLinije(); print(); 
		// 		}

		// 		clearInterval(interval); 
		// 		console.log("END"); 
		// 		radi();
		// 		return;
		// 	}

		// 	stavi(obj, x, y);
		// 	print(); 
		// 	izbrisi(obj, x, y);
		// 	x++;

		// }, 250); 

		let id;
		let cnt = 0;
		function smooth(){
			id = requestAnimationFrame(smooth);

			if(pokusajStaviti(obj, x, y) == false){
				console.log("Zavrsio");
				cancelAnimationFrame(id);
				
				if(x == 0){
					gotovo();
				}
				else{
					stavi(obj, x - 1, y);
					ocistiLinije(); 
					print(); 
					radi();
				}

				return;
			}

			// console.log("cnt: " + cnt);
			
			if(++cnt > limit()){
				cnt = 0;

				stavi(obj, x, y);
				print(); 
				izbrisi(obj, x, y);
				x++;


			}

		}

		id = requestAnimationFrame(smooth);

	}

	radi();

}

$(document).ready(function(){
	document.getElementById("score").innerHTML = score;

	radio = localStorage.getItem("radio");
	document.getElementById("nivo").innerHTML = radio;

	init_limit();

	init();

	igra();

	$(document).keydown(function(e){

		if(e.which == 37){
			console.log("left");

			y--;
			if(pokusajStaviti(obj, x, y) == false)y++;

		}

		// rotacija
		if(e.which == 38){
			console.log("up");

			let temp = rotacijaDesno(obj);
			
			temp = popravi(temp);
			if(pokusajStaviti(temp, x, y) == true){
				obj = temp;
			}

		}

		if(e.which == 39){
			console.log("right");

			y++;
			if(pokusajStaviti(obj, x, y) == false)y--;

			// console.log("y: " + y);
			// console.log("");

		}

		if(e.which == 40){
			console.log("down");
			
			x++;
			if(pokusajStaviti(obj, x, y) == false)x--;

		}

	});

	$("#dodaj").click(function(){

		let ime = document.getElementById("ime").value;
		if(ime == ""){
			alert("Nisi uneo ime!");
			return;
		}

		let cur = {a : ime, b : score};

		let A = JSON.parse(localStorage.getItem("svi"));
		if(!A)A = []

		A.push(cur);
		localStorage.setItem("svi", JSON.stringify(A));

		window.location.href = "index-end.html";

	});

});
