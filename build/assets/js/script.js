(function(){

	/*-----dictionary for card types-----*/
	var cardDetails = {
		amex : {
			radiobutton : '#amex-cc',
			cc_regex : /^3[47]/,
			cc_length : '[0-9]{15}',
			cvv_regex : '[0-9]{4}'
		},
		visa : {
			radiobutton : '#visa-cc',
			cc_regex : /^4/,
			cc_length : '[0-9]{13,16}',
			cvv_regex : '[0-9]{3}'
		},
		discover : {
			radiobutton : '#discover-cc',
			cc_regex : /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5])))/,
			cc_length : '[0-9]{16}',
			cvv_regex : '[0-9]{3}'
		},
		mastercard : {
			radiobutton : '#mastercard-cc',
			cc_regex : /^5[0-5]/,
			cc_length : '[0-9]{16}',
			cvv_regex : '[0-9]{3}'
		}
	};



	/*-----returns the type of card by card number-----*/
	function checkCardType(cardnum) {

		var type;

		$.each(cardDetails, function(card, details) {
			//console.log(details.cc_regex+" "+cardnum);
			if (details.cc_regex.test(cardnum)){
				//console.log(card);
				type = card;
			};
		});

		//console.log(type);
		changeCard(type);
	}


	/*-----changes html/css based on card type-----*/
	function changeCard(type){

		if(type){

			var radio = cardDetails[type].radiobutton;
			var length = cardDetails[type].cc_length;
			var cvv_loc = cardDetails[type].cvv_type;
			var cvv_length = cardDetails[type].cvv_regex;

			$(radio).prop('disabled', false).prop('checked', true);
			$('#cardnum').prop('pattern', length);
			$('#scode').prop('pattern', cvv_length);

			if(type == 'amex'){
				$('#amex_scode_loc').css('display', 'block');
				$('#other_scode_loc').css('display', 'none');
			} else {
				$('#amex_scode_loc').css('display', 'none');
				$('#other_scode_loc').css('display', 'block');
			}
		} else {
			$.each(cardDetails, function(card, details) {
				var radio = details.radiobutton;	
				$(radio).prop('disabled', true).prop('checked', false);
			});

			$('#cardnum').prop('pattern', '[0-9]{13,16}');
			$('#scode').prop('pattern', '[0-9]{3,4}');
			$('#amex_scode_loc').css('display', 'none');
			$('#other_scode_loc').css('display', 'block');
		}
	}

/*--------------executable code--------------*/

	$(':radio').prop('disabled', true);

	$('#cardnum').bind('keyup blur', function() {
		var cardnum = $('#cardnum').val();
		checkCardType(cardnum);
		//console.log($('#cardnum').prop('pattern'));
	});

})();

