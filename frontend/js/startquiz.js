//var questions=[{"description":"questionName",options:["1","2","3","4"]},{"description":"questionName",options:["1","2","3","4"]},{"description":"questionName",options:["1","2","3","4"]}]
var QuestionNo=1;
var marks=0;
var disable=true;
var questions=['Which built-in method combines the text of two strings and returns a new string?',' Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?','Which of the following is the correct syntax to redirect a url using JavaScript?','Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?','Which of the following function of Boolean object returns the primitive value of the Boolean object?'];
var options=[['append()','concat()','attach()','None of Above'],['concat()','every()','push','some()'],['document.location=http://www.newlocation.com','browser.location=http://www.newlocation.com','navigator.location=http://www.newlocation.com','window.location=http://www.newlocation.com'],['toExponential()','toFixed()','toPrecision()','toLocaleString()'],['toSource()','valueOf()','toString()','None of the Above']];
var answers=['A','B','D','B','B']
function next()
  {
    QuestionNo+=1;
    if(QuestionNo==5)
    {
        $(".fancy-btn").html("SUBMIT Answers");
        $(".fancy-btn").attr("data-toggle","modal")
        $(".fancy-btn").attr("data-target","#ResultModal")
    }
    if(QuestionNo<=5)
        display();
        disable=true;
  }
  function check(ans)
  { 
    if(ans==answers[QuestionNo-1])
    marks+=1;
    console.log(marks);
    disable=false;
  }
  function display()
  {
    $(".qno").html(`<h5>Question ${QuestionNo}</h5>`);
    $(".description").html(`${questions[QuestionNo-1]}`)
    $(".op1").html(`${options[QuestionNo-1][0]}`)
    $(".op2").html(`${options[QuestionNo-1][1]}`)
    $(".op3").html(`${options[QuestionNo-1][2]}`)
    $(".op4").html(`${options[QuestionNo-1][3]}`)
  }
  function showMarks()
  {
      $(".dis").hide();
      $(".score").html(`<p>You have completed the quiz.</p><h3>Your Score is ${marks} Out of 5</h3>`);
      $(".Restart").html(`<a href="/dashboard" ><button class="btn btn-primary" type="button" > Restart</button></a>`)
      $(".result").html(`<h3 class="text-center">Congratulations</h3>`)
  }
  display();
  function logout()
{
    localStorage.clear();
    window.href="/";
}
$("#username").html(`Welcome ${localStorage.username}`)