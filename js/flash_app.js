/*
function getWord(words){
    return words[Math.floor(Math.random() * words.length)];
}
*/
function getWord(words,filter){
    var found=false;
    var word="";
    console.log(filter);

    while(!found){
        word=words[Math.floor(Math.random() * words.length)];

        console.log(word);
/*
        console.log("Word: "+word.rus);
        console.log("Filter: "+filter);
        console.log("Category: "+word.category);
*/

        if(filter == "all" || word.category.includes(filter)){
            found=true;
            console.log("Found");
        }
        /*
        console.log("F:"+filter);
        console.log(word.category);
        */
    }

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
    console.log("Question word: "+question.rus);
    $("#question").html(question.rus);
   
    //var from=Object.keys(question)[0]
    //var to=question[from]

    var from=question.rus;
    var to=question.eng;

    $("#question").addClass("h1");
    $("#question").data("russian",from);
    $("#question").data("english",to);
    //console.log("New word: "+from+"("+to+")");
    $("#question").html(from);
    $("#answers").html(to);
}

$(document).ready(function() {
    var words=wordDeck.words;
    var currentFilter="all";
    //newQuestion(words);
    newQuestion(words,currentFilter);

    $("#conjugationButton").on("click",function(){
        $("#answers").empty();
        currentFilter="conjunction";
        newQuestion(words,currentFilter); 
    });
    $("#numberButton").on("click",function(){
        $("#answers").empty();
        currentFilter="number";
        newQuestion(words,currentFilter); 
    });
    $("#cardinalButton").on("click",function(){
        $("#answers").empty();
        currentFilter="cardinal";
        newQuestion(words,currentFilter); 
    });
    $("#allButton").on("click",function(){
        $("#answers").empty();
        currentFilter="all";
        newQuestion(words,currentFilter); 
    });
    $("#1000Button").on("click",function(){
        $("#answers").empty();
        currentFilter="1000";
        newQuestion(words,currentFilter); 
    });
    $("#nextButton").on("click",function(){
        $("#answers").empty();
        newQuestion(words,currentFilter); 
    });

});

