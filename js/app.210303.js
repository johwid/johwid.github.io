var app = (function(cardDeck, Showdown) {
  "use strict";

  var appName = 'Flash Cards',
    version = '0.2',
    cardCount = 0,
    cards = cardDeck.cards,
    cardsLength = cardDeck.cards.length,
    markdownConverter = new Showdown.converter(),
    questionCard = null,
    answerCards = null;

    // Shuffle card functions
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

  return {
    // Init everything
    init: function() {
      cardCount = 0;
        // Shuffle cards
      //cards = shuffle(cards);
    },
    // Event handler for getting next card
    getNextCard: function() {
      var card;
      card = cards[cardCount];
      cardCount = cardCount + 1;

      /*if (cardCount !== cardsLength) {
        card = cards[cardCount];
        cardCount = cardCount + 1;
      } else {
        cardCount = 0;
      }
    */
      return card;
    },
    // Check answer
    checkAnswer: function(answerCard){
      //var question=$('#question').data("russian");
      //alert(answerCard.data.english);
        if($(answerCard).data('russian') == $(question).data('russian')){
            console.log('Correct');
        }
        else{
            console.log('Wrong');
        }

    },
    getCard: function(){
        return cards[Math.floor(Math.random() * cards.length)];
    },
    generateAnswerCards: function(numberOfAnswerCards){
        var answerCards=[];
        for(var i=0;i<numberOfAnswerCards;i++){
            var answerCard=cards[Math.floor(Math.random() * cards.length)];
            answerCards[i]=answerCard;
        }
        return answerCards;
    },
    // Convert markdown
    markdownToHTML: function(markdownText) {
      var text = markdownText.replace(new RegExp('\\|', 'g'), '\n');
      return markdownConverter.makeHtml(text);
    }
  };
})(flashcardDeck, Showdown);

/*
 jQueryMobile event handlers
 */
// Event handler when loading start page
$(document).bind('pageinit', function(event, ui) {
  "use strict";
  app.init();
  $('#app-title').text(flashcardDeck.title);
  $('#app-catch-phrase').text(flashcardDeck.catchPhrase);
});

$(document).delegate("#title-page", "pagecreate", function() {
  "use strict";
  $(this).css('background', '#f0db4f');
  if (navigator.userAgent.match(/Android/i)) {
    window.scrollTo(0, 1);
  }
});

$(document).delegate("#main-page", "pageinit", function() {
  "use strict";
  function nextCard() {
    //$('#flash-card').trigger('collapse');
    //var questionCard = app.getNextCard();
    var questionCard = app.getCard();

        //check if null
      //window.location.href = '#resources-page';
        // Display question word
      $('#question').html(app.markdownToHTML(questionCard.russian));
      $('#question').data("russian",questionCard.russian);
      $('#question').data("english",questionCard.english);
        // Display answers
        var numberOfQuestions=4;
        for(var i=1; i<= numberOfQuestions; i++){
            var answerCard=app.getCard();
            //$('#flash-card').append('<a id="answer'+i+'" data-role="button" data-mini="true">test</a>');
            $("<a>").attr("data-role", "button")
                .text(answerCard.english)
                .data("russian",answerCard.russian)
                .data("english",answerCard.english)
                .bind("click", function(event, ui) {
                    app.checkAnswer(this); 
                    //console.log($(this).data("russian"));
                })
                .appendTo("#answers").button();
/*
            $('#answer'+i).html(app.markdownToHTML(answerCard.english));
            $('#answer'+i).data("russian",answerCard.english);
            $('#answer'+i).bind("click", function(event, ui) {
                app.checkAnswer(); 
          });
*/
        }
/*  
      // First answer
      $('#answer1').html(app.markdownToHTML(answerCard1.english));
      $("#answer1").bind("click", function(event, ui) {
           app.checkAnswer(questionCard,answerCard1); 
      });
      // Second answer
      $('#answer2').html(app.markdownToHTML(answerCard2.english));
      $('#answer3').html(app.markdownToHTML(answerCard3.english));
      $('#answer4').html(app.markdownToHTML(answerCard4.english));
*/
  }

    // "Next card" button
  $("#next-card").bind("click", function(event, ui) {
    nextCard();
  });
    // "Skip card" button
  $("#skip-card").bind("click", function(event, ui) {
    nextCard();
  });
    // Swipe-left motion (mobile?) 
  $("#main-page").on("swipeleft", function(event) {
    nextCard();
  });
    // ?
  $(document).delegate('#main-page', 'pageshow', function() {
    nextCard();
  });
});


