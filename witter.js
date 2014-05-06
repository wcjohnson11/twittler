$(document).ready(function(){
        var $body = $('body');


        setInterval(function(){
          var index = streams.home.length - 1;
          var tweet = streams.home[index];
          var span = $('#badge');
          span.html(streams.home.length);
          var $tweet = $('<article></article>');
          $tweet.text('@' + tweet.user + ': ' + tweet.message + 'Tweeted at:' + tweet.created_at);
          $tweet.prependTo($('div.content'));
          index += 1;
          if ($('article').length > 10){
            $('body article:last').slideUp(400, function(){
              $('body article:last').remove();
            });
            
          }

        }, 3000);
      });