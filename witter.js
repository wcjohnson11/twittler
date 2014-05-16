 //Set currentSource = null for amassTweets
 currentSource = null;

 //Amass tweets and append to ul.list-group-tweets
      
 var amassTweets = function(tweetUser) {
          currentSource = (tweetUser) ? tweetUser : null;

          var $tweets = $("ul.list-group-tweets");
          $tweets.html("");

          var source = (tweetUser) ? streams.users[tweetUser] : streams.home;
          var index = source.length - 1;
          while (index >= 0){
            var tweet = source[index];
            var $tweet = $("<li><div></div></li>").addClass("list-group-item");
            var user = "@" + tweet.user;
            $tweet.html("<span class='username' id=" + tweet.user + ">" + user + "</span>: ");
            $tweet.append(tweet.message + " " + moment(tweet.created_at).fromNow());
            $tweet.appendTo($tweets);
            index -=1;
          }
        };
//Amass users and append to ul.list-group-tweets
        var amassUsers = function(){
          var $users = $("ul.list-group-users");
          $users.html("");

          var index = users.length - 1;
          while (index >= 0){
            var user = users[index];
            var $user = $("<li class='list-group-item'></li>");
            $user.html("<a><span class='username' id=" + user + ">" + "@" + user + ": " + "</span></a>");
            $user.append("<span class='badge'>" + streams.users[user].length + "</span>");
            $user.appendTo($users);
            index -=1;
          }
        };

$(document).ready(function(){
        

        //Write tweets
        $(':submit').on('click',function(){
          writeTweet($(':submit').val());
        });


        //instantiate both interval and autoDisplay
        var interval,
        autoDisplay;

        //initial tweet and user load
        amassTweets(currentSource);
        amassUsers();

        //set up playPausetoggle
        $('.playpause').on('click', function(){
          if (!interval){
            interval = true;
            autoDisplay = setInterval(amassTweets(currentSource), 3000);
          }else{
            interval = false;
            clearInterval(autoDisplay);
          }
        });

        //update badge with current number of tweets every 1 second
        var userBadge = function(){
          setInterval(function(){
          var doug = streams.users["douglascalhoun"].length;
          var marcus = streams.users["mracus"].length;
          var sharks = streams.users["sharksforcheap"].length;
          var shawn = streams.users["shawndrost"].length;

          var userArray = [doug,marcus,sharks,shawn];

          var $badges = $('ul.list-group-users li span.badge');
          var index = 0;

          $badges.each(function(){
            $(this).html(userArray[index]);
            index +=1;
          });


        }, 3000);

        };

        userBadge();

        //Route to streams.home
        $('.navbar-brand').click(function(){
          amassTweets();
        });

        //Route to /.username

        $('.username').click(function(){
          amassTweets($(this).attr('id'));
        });

        //Use discover to update stream

        $('.discover').click(function(){
          amassTweets(currentSource);
        });

      });