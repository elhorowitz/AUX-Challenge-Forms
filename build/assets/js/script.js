$(document).ready(function() {

	function checkCardType(cardnum){

		var cardTypes = {
			amex: [ [34], [37] ],
			visa: [ [4] ],
			discover: [ [6011], [622126, 622925], [644, 649], [65] ],
			mastercard: [ [50, 55] ]
		};

		var type = '';

		if (cardnum.substr(0,1) == 4) {
			//console.log("visa");
			type = 'visa';
		} else if (cardnum.substr(0,2) == 34 || cardnum.substr(0,2) == 37) {
			//console.log("amex");
			type = 'amex';
		} else if (cardnum.substr(0,2) >= 50 && cardnum.substr(0,2) <= 55) {
			//console.log(cardnum.substr(0,2));
			type = 'mastercard';
		} else if (cardnum.substr(0,2) == 65 || cardnum.substr(0,3) >= 644 && cardnum.substr(0,3) <= 649 || cardnum.substr(0,4) == 6011 || cardnum.substr(0,6) >= 622126 && cardnum.substr(0,6) <= 622925) {
			//console.log("discover");
			type = 'discover';
		}

		return type;

	}

	$('#cardnum').keyup(function() {
		var cardnum = $('#cardnum').val();
		var type = checkCardType(cardnum);

		switch(type) {
			case 'amex':
				//console.log("amex");
				$('#amex-cc').prop('checked', true);
				$('#amex_scode_loc').css('display', 'block');
				$('#other_scode_loc').css('display', 'none');
				$('#scode').prop('pattern', '[0-9]{4}');
				break;

			case 'visa':
				//console.log("visa");
				$('#visa-cc').prop('checked', true);
				$('#amex_scode_loc').css('display', 'none');
				$('#other_scode_loc').css('display', 'block');
				$('#scode').prop('pattern', '[0-9]{3}');
				break;

			case 'discover':
				//console.log("discover");
				$('#discover-cc').prop('checked', true);
				$('#amex_scode_loc').css('display', 'none');
				$('#other_scode_loc').css('display', 'block');
				$('#scode').prop('pattern', '[0-9]{3}');
				break;

			case 'mastercard':
				//console.log("mastercard");
				$('#mastercard-cc').prop('checked', true);
				$('#amex_scode_loc').css('display', 'none');
				$('#other_scode_loc').css('display', 'block');
				$('#scode').prop('pattern', '[0-9]{3}');
				break;

			default:
				$('#amex-cc').prop('checked', false);
				$('#visa-cc').prop('checked', false);
				$('#discover-cc').prop('checked', false);
				$('#mastercard-cc').prop('checked', false);
				$('#scode').prop('pattern', '[0-9]{3,4}');
			break;
		}
		//console.log($('#scode').prop('pattern'));
	});
});