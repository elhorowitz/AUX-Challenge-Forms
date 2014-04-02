(function(){

	/*-----dictionary for card types-----*/
	var cardDetails = {
		amex : {
			radiobutton : '#amex-cc',
			cc_regex : /^3[47]/,
			cc_length : 15,
			cvv_regex : '[0-9]{4}'
		},
		visa : {
			radiobutton : '#visa-cc',
			cc_regex : /^4/,
			cc_length : [13,16],
			cvv_regex : '[0-9]{3}'
		},
		discover : {
			radiobutton : '#discover-cc',
			cc_regex : /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5])))/,
			cc_length : 16,
			cvv_regex : '[0-9]{3}'
		},
		mastercard : {
			radiobutton : '#mastercard-cc',
			cc_regex : /^5[0-5]/,
			cc_length : 16,
			cvv_regex : '[0-9]{3}'
		}
	};



	/*-----returns the type of card by card number-----*/
	function checkCardType(cardnum) {

		var type;

		$.each(cardDetails, function(card, details) {
			//console.log(details.cc_regex+" "+cardnum);
			if (details.cc_regex.test(cardnum)){
				console.log(card);
				changeCard(card);
			}
		});

		// if (cardnum.substr(0,1).is(cardDetails.)) {
		// 	//console.log("visa");
		// 	type = 'visa';
		// } else if (cardnum.substr(0,2) == 34 || cardnum.substr(0,2) == 37) {
		// 	//console.log("amex");
		// 	type = 'amex';
		// } else if (cardnum.substr(0,2) >= 50 && cardnum.substr(0,2) <= 55) {
		// 	//console.log(cardnum.substr(0,2));
		// 	type = 'mastercard';
		// } else if (cardnum.substr(0,2) == 65 || (cardnum.substr(0,3) >= 644 && cardnum.substr(0,3) <= 649) || cardnum.substr(0,4) == 6011 || (cardnum.substr(0,6) >= 622126 && cardnum.substr(0,6) <= 622925)) {
		// 	//console.log("discover");
		// 	type = 'discover';
		// }

		// return type;
	}

	/*-----changes html/css based on card type-----*/
	function changeCard(type){
		if(type){
			switch(type) {
				case 'amex':
					//console.log("amex");
					$('#amex-cc').prop('disabled', false).prop('checked', true);
					$('#visa-cc').prop('disabled', true).prop('checked', false);
					$('#discover-cc').prop('disabled', true).prop('checked', false);	
					$('#mastercard-cc').prop('disabled', true).prop('checked', false);


					$('#amex_scode_loc').css('display', 'block');
					$('#other_scode_loc').css('display', 'none');
					$('#cardnum').prop('pattern', '[0-9]{15}');
					$('#scode').prop('pattern', '[0-9]{4}');
					$('#scode').prop('title', 'Example: 1234');
					break;

				case 'visa':
					//console.log("visa");
					$('#amex-cc').prop('disabled', true).prop('checked', false);
					$('#visa-cc').prop('disabled', false).prop('checked', true);
					$('#discover-cc').prop('disabled', true).prop('checked', false);	
					$('#mastercard-cc').prop('disabled', true).prop('checked', false);
					
					$('#amex_scode_loc').css('display', 'none');
					$('#other_scode_loc').css('display', 'block');
					$('#cardnum').prop('pattern', '[0-9]{13|16}');
					$('#scode').prop('pattern', '[0-9]{3}');
					$('#scode').prop('title', 'Example: 123');
					break;

				case 'discover':
					//console.log("discover");
					$('#amex-cc').prop('disabled', true).prop('checked', false);
					$('#visa-cc').prop('disabled', true).prop('checked', false);
					$('#discover-cc').prop('disabled', false).prop('checked', true);	
					$('#mastercard-cc').prop('disabled', true).prop('checked', false);
					
					$('#amex_scode_loc').css('display', 'none');
					$('#other_scode_loc').css('display', 'block');
					$('#cardnum').prop('pattern', '[0-9]{16}');
					$('#scode').prop('pattern', '[0-9]{3}');
					$('#scode').prop('title', 'Example: 123');
					break;

				case 'mastercard':
					//console.log("mastercard");
					$('#amex-cc').prop('disabled', true).prop('checked', false);
					$('#visa-cc').prop('disabled', true).prop('checked', false);
					$('#discover-cc').prop('disabled', true).prop('checked', false);	
					$('#mastercard-cc').prop('disabled', false).prop('checked', true);
					
					$('#amex_scode_loc').css('display', 'none');
					$('#other_scode_loc').css('display', 'block');
					$('#cardnum').prop('pattern', '[0-9]{16}');
					$('#scode').prop('pattern', '[0-9]{3}');
					$('#scode').prop('title', 'Example: 123');
					break;

				default:
					$('#amex-cc').prop('disabled', true).prop('checked', false);
					$('#visa-cc').prop('disabled', true).prop('checked', false);
					$('#discover-cc').prop('disabled', true).prop('checked', false);	
					$('#mastercard-cc').prop('disabled', true).prop('checked', false);
					
					$('#cardnum').prop('pattern', '[0-9]{13, 16}');
					$('#scode').prop('pattern', '[0-9]{3,4}');
					$('#scode').prop('title', 'Example: 123');
				break;
			};
		};
	}

/*--------------executable code--------------*/

	$(':radio').prop('disabled', true);

	$('#cardnum').bind('keyup blur', function() {
		var cardnum = $('#cardnum').val();
		var type = checkCardType(cardnum);
		changeCard(type);
		//console.log($('#cardnum').prop('pattern'));
	});

})();

