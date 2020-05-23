
$(function (){

    $('#form').submit(function(e){
        e.preventDefault();

        var text = $(this).serialize();
        console.log(txt);

        $.ajax({

            type: 'post',
            url: 'ajax.php',
            data: txt,
            dataType: 'json',
            sucess: function(json){
                console.log(json);
            }





        })

    });

});