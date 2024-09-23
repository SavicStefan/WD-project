$(document).ready(function(){

	$("#start").click(function(){
		let a1 = document.getElementById("a1").checked;
		let a2 = document.getElementById("a2").checked;
		let a3 = document.getElementById("a3").checked;

		if(a1 == true){
			localStorage.setItem("radio", "lako");
		}
		else if(a2 == true){
			localStorage.setItem("radio", "srednje");
		}
		else{
			localStorage.setItem("radio", "tesko");
		}

		window.location.href = "index.html";

	});

});