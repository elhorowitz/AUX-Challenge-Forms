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




(function(){

	$('.forminputs').each(function() {
		var inputID = $(this).attr('id');
		$(this).after('<label class="status" id="status'+inputID+'" aria-live="polite">hidden</label>');
	});

    $.validator.addMethod('html5_valid', function(value, element){
        var pattern = new RegExp($(element).attr('pattern'));
        console.log(pattern);
        return pattern.test(value);
    });


	// Setup form validation on the #register-form element
    $(".form").validate({
    	onkeyup: false,
        // Specify the validation rules
        rules: {
            ptitle: {
            	required: true,
            	html5_valid: true
            },
            paddress: {
            	required: true,
            	html5_valid: true

            },
            name: {
                required: true,
            	html5_valid: true
            },
            email: {
                required: true,
            	email: true
            },
            pword: {
            	required: true,
            	html5_valid: true
            }, 
            cardnum: {
            	required: true,
            	html5_valid: true
            }, 
            scode: {
            	required: true,
            	html5_valid: true
            },
            month: {
            	min: 1
            },
            year: {
            	min: 1
            }
        },
        // Specify the validation error messages
        messages: {
            ptitle: "Must begin with a letter and be 2 to 20 characters long",
            paddress: "Must begin with a letter and be 2 to 20 characters long. Only dashes, underscores, and periods are allowed for symbols!",
            name: "Must begin with a letter and be 2 to 20 characters long",
            password: "Must include an uppercase character, a lowercase character, and a number. Minimum 5 characters long!",
            cardnum: "Only include numbers! Example: 1234567891011",
            scode: "Example: 123"
        },

        highlight: function(element, errorClass) {
        	var inputID = $(element).attr('id');
	        $(element).removeClass(errorClass);
	        $("."+errorClass).attr("aria-live", "polite").attr("aria-atomic", true);
	        $(element).next("."+errorClass).attr("id", inputID+errorClass);
	        $('#status'+inputID).css('background', "url('/assets/images/sprite.png') no-repeat -2px -499px").html('invalid');
	        if(inputID.match('email')){
	        	$('#share').css('margin', '0 0 13px 0');
	        }
	    },

	    success: function(label, element) {
	    	//console.log($(label));
	    	$(label).css( "display", "none" );
        	var thisID = $(element).attr('id');
	        $('#status'+thisID).css("background", "url('/assets/images/sprite.png') no-repeat -31px -499px").html('valid');
	        if(thisID.match('email')){
	        	$('#share').css('margin', '-12px 0 25px 0')
	        }
	    },
	    
	    submitHandler: function(form) {
            form.submit();
        }
    
    });

})();

