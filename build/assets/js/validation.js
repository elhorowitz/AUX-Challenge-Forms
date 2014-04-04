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

