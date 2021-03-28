function getWord(words){
    return words[Math.floor(Math.random() * words.length)];
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

function newQuestion(words){
    // Get question card
    var question=getWord(words);
    $("#question").html(question.russian);
   
    var from=Object.keys(question)[0]
    var to=question[from]

    $("#question").addClass("h1");
    $("#question").data("russian",from);
    $("#question").data("english",to);
    //console.log("New word: "+from+"("+to+")");
    $("#question").html(from);
    
    // Get answers
    var answers=[]
    var numberOfAnswers=10§

    // Push correct answer to the list
    answers.push([from,to]);

    //Add other answers
    for(var i=1; i<numberOfAnswers; i++){
        var answer=getWord(words);
        from=Object.keys(answer)[0]
        to=answer[from]
        answers.push([from,to]);
        //console.log(from+" - "+to);
    }

    //Shuffle answers
    answers=shuffle(answers); 

    for(var i=0; i<numberOfAnswers; i++){
        $("<button>").attr("class", "btn btn-primary")
            .attr("id","b"+i)
            .attr("type","button")
            .text("test"+i)
            .text(answers[i][1])
            .data("russian",answers[i][0])
            .data("english",answers[i][1])
            .appendTo("#answers").button();

            // Correction logic
            $("#b"+i).on("click", function(){
                //console.log($(this).data('russian')+" - "+$(this).data('english'));
                console.log($("#question").data('russian')+" == "+$(this).data('russian'));
                if($("#question").data('russian') == $(this).data('russian')){
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
    var words=wordDeck.words;
    newQuestion(words);
    $("#nextButton").on("click",function(){
        $("#answers").empty();
        newQuestion(words); 
    });
});

