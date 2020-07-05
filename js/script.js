function handleCityButton() {
	let city = $("#input-city").val();
	if (city) {
		localStorage.setItem("City", city);
		$(".link-reload").css("display", "block");
	}
}

function handleCityLink() {
	localStorage.removeItem("City");
}

function handleCitySection() {
	let city = localStorage.getItem("City");
	if (city) {
		$(".city-mess-text").text("Ваш город " + city);
		$(".city-mess").css("display", "block");
		$(".city-form").css("display", "none");
		$(".link-reload").css("display", "none");
	} else {
		$(".city-mess").css("display", "none");
		$(".city-form").css("display", "block");
		$(".link-reload").css("display", "none");
	}
}

function handleQuizButton() {
	$(".chbx-quiz").each(function() {
		localStorage.setItem(
			$(this).attr('id'),
			$(this).prop("checked")
		);
	});
	showQuiz(true);
}

function handleQuizLink(event) {
	$(".chbx-quiz").each(function() {
		let key = $(this).attr('id');
		localStorage.removeItem(key);
	});
	handleQuizSection();
	event.preventDefault();
}

function showQuiz(have_cookies = true) {
	$(".chbx-quiz").each(function() {
		if (have_cookies) {
			$(this).prop('disabled', true);
		} else {
			$(this).prop('disabled', false);
		}
	});


	if (have_cookies) {
		$(".lnk-quiz").css("display", "block");
		$(".btn-quiz-wrp").css("display", "none");
	} else {
		$(".lnk-quiz").css("display", "none");
		$(".btn-quiz-wrp").css("display", "flex");
	}
}

function handleQuizSection() {
	function haveCookies() {
		let result = false
		$(".chbx-quiz").each(function() {
			let key = $(this).attr('id');
			let value = localStorage.getItem(key);
			if (value) {
				$(this).prop("checked", (value === "true"));
				result = true;
			} else {
				$(this).prop("checked", false);
			}
		});
		return result;
	}
	showQuiz(haveCookies());
}

$(document).ready(() => {
	$("#btn-city").click(handleCityButton);
	$(".lnk-city").click(handleCityLink);
	$(".btn-quiz").click(handleQuizButton);
	$(".lnk-quiz").click(handleQuizLink);

	handleCitySection();
	handleQuizSection();
});