$(document).ready(function () {

    //Словарь ответов
    //Можно сделать и вопросы сюда, чтобы контейнеры не плодить

    var questionDic = [
        {
            id:1,
            answer:2
        },
        {
            id:2,
            answer:2
        },
        {
            id:3,
            answer:2
        },
        {
            id:4,
            answer:1
        },
        {
            id:5,
            answer:2
        },
        {
            id:6,
            answer:1
        },
        {
            id:7,
            answer:3
        }
    ];

    var TopHeight = 100;



    //Начальная анимация
    $('.main').addClass('main-in');

    $('.cloud').each(function(){
      $(this).addClass('cloud-in');
    });

    $('.clouds-block').addClass('clouds-block-in');

    $('.first-question-item').addClass('first-question-in');
    //Положение плашки
    function mtQuestion(){
        var windowHeight = $(window).height()-100;
        var questionHeight = $('.question-block').height();
        var mtQuestion = (windowHeight - questionHeight)/2;
        $('.question-block').css('margin-top',mtQuestion);
    }
    mtQuestion();
    $(window).resize(function(){
      mtQuestion();
    });


    //Наведение на облако
    $('body').on('mousemove','.game-begin .cloud',function(){
      var cloudOpacity = $(this).css('opacity');

      $(this).css('opacity',(cloudOpacity-0.5));
      if(cloudOpacity < 0.2){
        $(this).css({"z-index":"-1", "opacity":"0"})
      }
    });



    //Логика кнопок
    //Не входят в тест(просто классы)
    $('.first-question-item').on('click',function(){
        $(this).hide();
        $('.second-question-item').show();
        mtQuestion();
    });
    $('.second-question-item').on('click',function(){
        $(this).hide();
        $('.question-block').find("[data-question='1']").show();
        $('.main').addClass('game-begin');
        $('body').css('cursor','url(assets/images/decoration/cursor1.png),auto');
        $('.tree-block').show();
        mtQuestion();
    });


    //function questionAlert(alertType,nextQuestionBlock){
    //
    //}
    var nextQuestion = 0;
    //Переключение вопросов
    $('.main-button-question').on('click',function(){
        var Question = $(this).parent('.question-real');
        var currentQuestion = parseInt(Question.attr('data-question'));
        var currentAnswer = Question.find('input:checked').parent('.question-answer-row').index()+1;
        nextQuestion = currentQuestion+1;
        console.log(nextQuestion);
        Question.hide();
        if(questionDic[currentQuestion-1].answer == currentAnswer){

            $('.question-alert.question-success').show();

        }else{
            $('.question-alert.question-error').show();
        }
        mtQuestion();

    });

    //$('.last-question-button').on('click',function(){
    //
    //});

    $('.question-alert .main-button').on('click',function(){
        $('body').css('cursor','url(assets/images/decoration/cursor'+nextQuestion+'.png),auto');
        $('.question-alert').hide();
        $('.question-real').eq(nextQuestion).show();
        mtQuestion();
        console.log(nextQuestion-1);
        if(questionDic.length == (nextQuestion-1)){
            $('.main').removeClass('.game-begin');
            //$('.clouds-block').removeClass('clouds-block-in');
            $('.cloud').each(function(){
                $(this).removeClass('cloud-in');
            });
            $('.all-clear').show();
            mtQuestion();
        }
    });

    $('.all-clear .main-button').on('click',function(){
        $('.tree-block').addClass('tree-in');
        $('.all-clear').hide();
        $('.treess-counter').addClass('treess-counter-in');
        mtQuestion();
    })

});



