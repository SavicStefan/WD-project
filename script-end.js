
$(document).ready(function(){

	let A = JSON.parse(localStorage.getItem("svi"));
	console.log(A);

	let n = A.length;
	if(n > 0){
		let X = A[n - 1]

		$("#prosli").append(X.a + " " + X.b);

		A.sort(function(s1, s2){
			return s2.b - s1.b;
		});

		for(i = 0; i < Math.min(n, 5); i++){
			$("table").append('<tr>' + '<td>' + A[i].a + '</td>' + 
							  '<td>' + A[i].b + '</td>' + '</tr>')
		}

	}


	$("#startover").click(function(){
		window.location.href = "index-begin.html";
	});

});
