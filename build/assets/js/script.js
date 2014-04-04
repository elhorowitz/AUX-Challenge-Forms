(function(){

	/*-----dictionary for card types-----*/
	var cardDetails = {
		amex : {
			radiobutton : 'amex-cc',
			cc_regex : /^3[47]/,
			cc_length : '^[0-9]{15}$',
			cvv_regex : '^[0-9]{4}$',
			pattern : 'Only include numbers! Example: 123412345612345',
			is_checked : 'url(\'..\/images\/sprite.png\') no-repeat 0 -122px',
			not_checked : 'url(\'..\/images\/sprite.png\') no-repeat 0 -206px'
		},
		visa : {
			radiobutton : 'visa-cc',
			cc_regex : /^4/,
			cc_length : '^[0-9]{13,16}$',
			cvv_regex : '^[0-9]{3}$',
			pattern : 'Only include numbers! Example: 1234123412341234',
			is_checked : 'url(\'..\/images\/sprite.png\') no-repeat -48px -122px',
			not_checked : 'url(\'..\/images\/sprite.png\') no-repeat -48px -164px'
		},
		discover : {
			radiobutton : 'discover-cc',
			cc_regex : /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5])))/,
			cc_length : '^[0-9]{16}$',
			cvv_regex : '^[0-9]{3}$',
			pattern : 'Only include numbers! Example: 1234123412341234',
			is_checked : 'url(\'..\/images\/sprite.png\') no-repeat -96px -122px',
			not_checked : 'url(\'..\/images\/sprite.png\') no-repeat -96px -206px'
		},
		mastercard : {
			radiobutton : 'mastercard-cc',
			cc_regex : /^5[0-5]/,
			cc_length : '^[0-9]{16}$',
			cvv_regex : '^[0-9]{3}$',
			pattern : 'Only include numbers! Example: 1234123412341234',
			is_checked : 'url(\'..\/images\/sprite.png\') no-repeat -144px -122px',
			not_checked : 'url(\'..\/images\/sprite.png\') no-repeat -144px -206px'
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

			//dim all other credit card images
			for (var alltypes in cardDetails){
				if(alltypes != type){
					var otherradios = cardDetails[alltypes].radiobutton;
					//console.log(cardDetails[alltypes].not_checked);
					document.getElementById(otherradios).style.background = cardDetails[alltypes].not_checked;
				} else {
					var radio = cardDetails[type].radiobutton;
					var length = cardDetails[type].cc_length;
					var error_message = cardDetails[type].pattern;
					var cvv_loc = cardDetails[type].cvv_type;
					var cvv_length = cardDetails[type].cvv_regex;

					//console.log(document.getElementById(radio));
					document.getElementById(radio).removeAttribute('disabled'); 
					document.getElementById(radio).checked = true;
					document.getElementById('cardnum').setAttribute('pattern', length);
					document.getElementById('cardnum').setAttribute('title', error_message);
					document.getElementById('scode').setAttribute('pattern', cvv_length);

					if(type == 'amex'){
						document.getElementById('amex_scode_loc').style.display = 'block';
						document.getElementById('other_scode_loc').style.display = 'none';
					} else {
						document.getElementById('amex_scode_loc').style.display = 'none';
						document.getElementById('other_scode_loc').style.display = 'block';
					}
				}
			}

		} else {

			for(var card in cardDetails){
				var radio = cardDetails[card]['radiobutton'];
				document.getElementById(radio).disabled = true; 
				document.getElementById(radio).checked = false; 
				document.getElementById(radio).style.background = cardDetails[card].is_checked;
			}

			document.getElementById('cardnum').setAttribute('pattern', '[0-9]{13,16}');
			document.getElementById('cardnum').setAttribute('title', 'Only include numbers! Example: 1234123412341234');
			document.getElementById('scode').setAttribute('pattern', '[0-9]{3,4}');
			document.getElementById('amex_scode_loc').style.display = 'none';
			document.getElementById('other_scode_loc').style.display = 'block';
		}
	}

/*--------------CC detection: set up--------------*/

	for (var card in document.getElementsByName('cardtype')) {
		document.getElementsByName('cardtype')[card].disabled = true;
	};

	document.getElementById('cardnum').onkeyup = function() {
		var cardnum = document.getElementById('cardnum').value;
		checkCardType(cardnum);
		//console.log($('#cardnum').prop('pattern'));
	};

})();



/*--------------show password--------------*/

(function(){

	var password_toggle = document.getElementById('show_pword');
	var password = document.getElementById('pword');

	password_toggle.onclick = function() {
		if(password_toggle.checked) {
			//console.log('checked!');
			password.setAttribute('type', 'text');
		} else {
			//console.log('unchecked!');
			password.setAttribute('type', 'password');
		};
	};
	

})();


(function() {
	Modernizr.load([
	    {
	        test: Modernizr.input.required,
	        nope : [
	            'assets/js/lib/jquery.js',
	            'assets/js/lib/jquery.validate.min.js',
	            'assets/js/validation.js'
	        ]
	    } 
	]);
})();

