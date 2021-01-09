var playing= false;
var score = 0;
var trialsleft;
var step;
var action;
var fruits = ['Banana', 'Cherry', 'Coconut', 'Green_Apple', 'Kiwi_Fruit', 'Lemon', 'Lime', 'Mango', 'Orange', 'Passionfruit', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Pumpkin', 'Red_Apple', 'Strawberry', 'Tomato', 'Watermelon'];
$(function(){

    //click on start button

    $("#start").click(function(){

        //we are playing
        if(playing == true){

            //reload page
            location.reload();
        }
        else{
            //we are not playing
            playing  = true; //game initiated
            
            //set score to 0
            score = 0;
            
            //set score value in span
            $("#score").html(score);
            
            // //change start button to reset
            $("#start").html("Reset Game");
            
            //display lives div
            $("#lives").show();
            
            //set trialsleft to 3
            trialsleft = 3;
            addHearts();
            
            //hide game over box
            $("#gameover").hide();
            
            //start sending fruits
            startAction();
        }
    });

//slice a fruit

$("#fruit1").mouseover(function(){
    score++;
    $("#score").html(score); //update score
    $("#slicesound")[0].play(); //play sound

    //stop fruit
    clearInterval(action);
    
    //hide fruit through animation
    $("#fruit1").hide("explode",500); //slice

    //send new fruit()
    setTimeout(startAction,800);
});

//functions
function addHearts(){
    $("#lives").empty();
    for(i=0;i<trialsleft;i++){
        $("#lives").append('<img src="Images/heart.png" class="life">');
    }
}
function startAction(){
    $("#fruit1").show();
    chooseFruit();//choose random fruit
    $("#fruit1").css({'left' : 25+Math.round(550*Math.random()) , 'top' : -50}) //random position;

    //generate a random step
    step = 1+Math.round(5*Math.random());

    //move fruit down every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        //check if the fruit is too low
        if($("#fruit1").position().top >500){
            if(trialsleft>1)
            {
                $("#fruit1").show();
                chooseFruit();//choose random fruit
                $("#fruit1").css({'left' : 25+Math.round(550*Math.random()) , 'top' : -50}) //random position;

                //generate a random step
                step = 2+Math.round(3*Math.random());

                //reduce trials by 1
                trialsleft--;

                //update hearts
                addHearts();
            }
            else{
                //game over
                playing = false;

                //show game over box
                $("#gameover").show();
                $("#gameover").html("Game Over<br>Your Score is: " + score);

                //change reset button to start button
                $("#start").html("Start Game");

                //remove lives
                $("#lives").hide();

                //stop fruits
                clearInterval(action);
                //remove fruit
                $("#fruit1").hide();
            }
        }

    },10);
}

//generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src','Images/'+fruits[Math.round(Math.random()*18)]+'.png');
}

function stopAction(){
    $("#fruit1").hide();
    clearInterval(action);
}

$('a.toggler').click(function(){
    $(this).toggleClass('off');
    // document.getElementsByTagName("body").toggleClass('white');
    $("body").toggleClass('white');
    $("label").toggleClass('whitetext');
    $(".moon").toggle();
    $(".sun").toggle();
    $("#container").toggleClass('darkcontainer');
});
     
});