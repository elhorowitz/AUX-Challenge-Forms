(function(){

	/*-----dictionary for card types-----*/
	var cardDetails = {
		amex : {
			radiobutton : 'amex-cc',
			cc_regex : /^3[47]/,
			cc_length : '^[0-9]{15}$',
			cvv_regex : '^[0-9]{4}$'
		},
		visa : {
			radiobutton : 'visa-cc',
			cc_regex : /^4/,
			cc_length : '^[0-9]{13,16}$',
			cvv_regex : '^[0-9]{3}$'
		},
		discover : {
			radiobutton : 'discover-cc',
			cc_regex : /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5])))/,
			cc_length : '^[0-9]{16}$',
			cvv_regex : '^[0-9]{3}$'
		},
		mastercard : {
			radiobutton : 'mastercard-cc',
			cc_regex : /^5[0-5]/,
			cc_length : '^[0-9]{16}$',
			cvv_regex : '^[0-9]{3}$'
		}
	};



	/*-----returns the type of card by card number-----*/
	function checkCardType(cardnum) {

		var type;
		//console.log(cardDetails['amex']['cc_regex']);
		for (var card in cardDetails) {
			if (cardDetails[card]['cc_regex'].test(cardnum)) {
				type = card;
			};
		};

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

			//console.log(document.getElementById(radio));
			document.getElementById(radio).removeAttribute('disabled'); 
			document.getElementById(radio).checked = true;
			document.getElementById('cardnum').setAttribute('pattern', length);
			document.getElementById('scode').setAttribute('pattern', cvv_length);

			if(type == 'amex'){
				document.getElementById('amex_scode_loc').style.display = 'block';
				document.getElementById('other_scode_loc').style.display = 'none';
			} else {
				document.getElementById('amex_scode_loc').style.display = 'none';
				document.getElementById('other_scode_loc').style.display = 'block';
			}
		} else {

			for(var card in cardDetails){
				var radio = cardDetails[card]['radiobutton'];
				document.getElementById(radio).disabled = true; 
				document.getElementById(radio).checked = false; 
			}

			document.getElementById('cardnum').setAttribute('pattern', '[0-9]{13,16}');
			document.getElementById('scode').setAttribute('pattern', '[0-9]{3,4}');
			document.getElementById('amex_scode_loc').style.display = 'none';
			document.getElementById('other_scode_loc').style.display = 'block';
		}
	}

/*--------------executable code--------------*/

	for (var card in document.getElementsByName('cardtype')) {
		document.getElementsByName('cardtype')[card].disabled = true;
	};

	document.getElementById('cardnum').onkeyup = function() {
		var cardnum = document.getElementById('cardnum').value;
		checkCardType(cardnum);
		//console.log($('#cardnum').prop('pattern'));
	};

})();

