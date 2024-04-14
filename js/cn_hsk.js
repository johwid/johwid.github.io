/*
function getWord(words){
    return words[Math.floor(Math.random() * words.length)];
}
*/
function getWord(words,filter){
    var found=false;
    var word="";
    console.log('Filter:'+filter);

    word=words[Math.floor(Math.random() * words.length)];
    return word
}

function shuffle(array) {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter = counter - 1;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function newQuestion(words,filter){
    // Get question card
    //var question=getWord(words);
    var question=getWord(words,filter);
    console.log("Question word: "+question.hanzi);
    $("#question").html(question.hanzi);
   
    //var from=Object.keys(question)[0]
    //var to=question[from]

    var from=question.hanzi;
    var to=question.translations.join(", "); 

    $("#question").addClass("h1");
    $("#question").data("mandarin",from);
    $("#question").data("eng",to);
    //console.log("New word: "+from+"("+to+")");
    $("#pinyin").html(question.pinyin);
    //$("#pinyin").addClass("h4");
    //$("#answers").html(to);
    
    // Get answers
    var answers=[]
    var numberOfAnswers=10

    // Push correct answer to the list
    answers.push([from,to]);

    //Add other answers
    for(var i=1; i<numberOfAnswers; i++){
        var answer=getWord(words,filter);
        //from=Object.keys(answer)[0]
        from=answer.hanzi;
        to=answer.translations.join(", "); 
        answers.push([from,to]);
        //console.log(from+" - "+to);
    }

    //Shuffle answers
    answers=shuffle(answers); 

    //TODO: rewrite this to be more generic parameter names
    for(var i=0; i<numberOfAnswers; i++){
        $("<button>").attr("class", "btn btn-primary")
            .attr("id","b"+i)
            .attr("type","button")
            .text("test"+i)
            
            .text(answers[i][1])
            //.text(answers[i].rus)
            
            .data("mandarin",answers[i][0])
            //.data("russian",answers[i].rus)
            
            .data("english",answers[i][1])
            //.data("english",answers[i].eng)
            
            .appendTo("#answers").button();

            // Correction logic
            $("#b"+i).on("click", function(){
                //console.log($(this).data('russian')+" - "+$(this).data('english'));
                console.log($("#question").data('mandarin')+" == "+$(this).data('mandarin'));
                if($("#question").data('mandarin') == $(this).data('mandarin')){
                    console.log('Correct');
                    $(this).addClass("btn-success");
                }
                else{
                    console.log('Wrong');
                    $(this).addClass("btn-danger");
                }

            });
       }
}

$(document).ready(function() {
    var words=wordDeck;
    var currentFilter="all";
    //newQuestion(words);
    newQuestion(words,currentFilter);

/* 
    $("#allButton").on("click",function(){
        $("#answers").empty();
        currentFilter="all";
        newQuestion(words,currentFilter); 
    });
    $("#100Button").on("click",function(){
        $("#answers").empty();
        currentFilter="100";
        newQuestion(words,currentFilter); 
    });
    $("#radicalButton").on("click",function(){
        $("#answers").empty();
        currentFilter="radical";
        newQuestion(words,currentFilter); 
    });
    $("#commonButton").on("click",function(){
        $("#answers").empty();
        currentFilter="common";
        newQuestion(words,currentFilter); 
    });
    $("#measureButton").on("click",function(){
        $("#answers").empty();
        currentFilter="measure word";
        newQuestion(words,currentFilter); 
    });
    $("particleButton").on("click",function(){
        $("#answers").empty();
        currentFilter="particle";
        newQuestion(words,currentFilter); 
    });
*/
    $("#nextButton").on("click",function(){
        $("#answers").empty();
        newQuestion(words,currentFilter); 
    });

});

