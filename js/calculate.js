$(document).ready(function () {
	//click function to calculate dateTotal (Hours * Hourly Rate)
    $('#calculate').on('click', function() {
        $('.hours-table tr').each(function() {
            var theHours = $(this).find('input.hour').val();
            var theRate = $(this).find('input.hourly-rate').val();
            var theDateTotal = (theHours * theRate);
            $(this).find('input.date-total').val(theDateTotal);

			//Find the sum of all the dateTotals
			var sum = 0;
		    //iterate through each total and add the values
		    $("input.date-total").each(function () {
		        //add only if the value is a number
		        if (!isNaN($(this).val()) && $(this).val().length != 0) {
		            sum += parseFloat(this.value);
					
		        }
		    });	
			
			if (sum < 0) {
				alert("Total can't be negative");
				$('#final-total').val('');
			} else {
				$("#final-total").val(sum)
	      	}
			
        }); //END .each
        return false;

    }); // END click 
	
});

// Adding new rows to table that add to base contracting rate
$(function(){
    var counter = 4;
    $('a.add-row').click(function(event){
        event.preventDefault();
        counter++;
        var newRow = jQuery('<tr><td><input type="text" value="" /></td><td><input type="text" class="hour" name="rate-0' + counter + '"/></td><td><input type="text" class="hourly-rate" name="rate-0' + counter + '"/></td><td><input type="text" class="date-total" readonly name="date-total-0' + counter + '"/></td></tr>');
        $('table.hours-table').append(newRow);
    });
});

// Make sure first input element ( base rate ) is >= all other rates added together
$(document).on('blur','.hour',function(e){
    var current=$(this);
    var baseRate=$('input.hour:first');
    var total=0;
    var other=$('input.hour:not(:first)');

   // verify base is entered first
 	if(baseRate.val()==="")
    {
        alert('Enter Base First');
        current.val('');
        baseRate.focus();
        e.stopPropagation();
        return;
    }
    $.each($(other),function(index,value){
        if(value.value!=="")
               total+=parseInt(parseInt(value.value)); 
    });
    console.log(total);
    if(!(current).is(baseRate))
    {
        if(parseInt(current.val())>parseInt(baseRate.val()))
        {
            current.val('');
        }
        else if(total>parseInt($('input.hour:first').val()))
            current.val('');
    }
});