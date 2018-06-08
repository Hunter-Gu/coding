define(['jquery'],function($){
    var layout = (function(){
        var opts = {
            url: 'data.php',
            type: 'get',
            dataType: 'json',
            data: {
                getData: 'getData'
            },
            success: function(data){
                dealWith(data);
                layout();
            },
            error: function(){
                console.log('error...')
            }
        };

        function layout(){
            $('.content').each(function(){
                if($(this).hasClass('layout')){
                    return ;
                }
                $(this).css({
                    'left': Math.floor(Math.random() * 580),
                    'top': Math.floor(Math.random() * 276)
                });
                $(this).addClass('layout')
            })
        }

        function getData(){
            $.ajax(opts);
        }
        function dealWith(data){
            for(var i = 0;i < data.length;i ++){
                var str = ''
                data[i] = JSON.parse(data[i])
                str += '<div class="content"><div class="time"><p><span>' + data[i]['time'];
                str += '</span><a href="javascript:void(0)" class="close">x</a></p></div><p class="word">' + data[i]['content'];
                str += '</p><p class="name"><img src="img/bpic_1.gif">' + data[i]['name'] + '</p></div>';
                $('.ct-word').append($(str));      
            }
        }
        $('.ct-word').on('click','a',function(){
            $(this).parents('.content').remove();
        })
        $('.ct-word').on('click','.content',function(){
            $('.index').removeClass('index')
            $(this).addClass('index');
        });

        return {
            getData: getData,
            layout: layout
        };
    })();
    return layout
});