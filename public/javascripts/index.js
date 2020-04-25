$fucntion(){
    $('#loginBox').find('button').on('click',function(){
        //$('#loginBox').hide();
        $ajax({
            type:'post',
            url: 'users/login',
            data: {
                username: $('#loginBox').find("[name = 'username']").val(),
                password: $('#loginBox').find("[name = 'password']").val()
            },
            dataType: 'json',
            success: function (result) {
                if (!result.code){
                    setTimeout(function () {
                        $('#loginBox').hide();
                    },1000)
                }
            }
        })
    })
    }
