export class Quiz
{
    constructor(questions)
    {
        this.questions = questions;
        this.totalQuestion = questions.length;
        this.numberOfQuestion = 0;
        this.correctAnswer;
        this.score = 0;
        this.showQuestion();
        $("#submitBtn").click(this.nextQuestion.bind(this));
        $("#tryAgainBtn").click(this.tryAgain.bind(this));
    }


    showQuestion()
    {
        $("#current").html(`${this.numberOfQuestion + 1} Of ${this.totalQuestion} Question`);
        $("#myQuestion").html(`${this.questions[this.numberOfQuestion].question}`);
        this.correctAnswer = this.questions[this.numberOfQuestion].correct_answer;
        let Answer = [...this.questions[this.numberOfQuestion].incorrect_answers];  
        let randomNumber = Math.ceil(Math.random()*Answer.length);
        Answer.splice(randomNumber,0,this.correctAnswer);
        let cartona="";
        for(let i = 0;i<Answer.length;i++)
        {
            cartona +=`<input id="${i+1}" type="radio" class="form-check-input" name="answer" value="${Answer[i]}"><label for="${i+1}" class="px-2">${Answer[i]}</label> <br>`;
        }
        $("#myAnswers").html(cartona);
    }

    nextQuestion()
    {
        let answer = $("input[name='answer']:checked").val();
        let threshold = Math.ceil(this.totalQuestion / 2 );
        if(answer===this.correctAnswer)
        {
            this.score++;
            this.numberOfQuestion++;
            if(this.numberOfQuestion<this.totalQuestion)
            {
                this.showQuestion();
            }
        }

        else if(answer==undefined)
        {
            $("#message2").fadeIn(500).fadeOut(6000);
        }

        else
        {
            this.numberOfQuestion++;
            if(this.numberOfQuestion<this.totalQuestion)
            {
                this.showQuestion();
            }
        }

        if(this.numberOfQuestion==this.totalQuestion)
        {
            $("#quiz").fadeOut(0);
            $("#addScore").html(this.score);
            $("#score").fadeIn(500);
            $("#fail").fadeIn(500);
           
            if(this.score>=threshold)
            {
                $("#fail").fadeOut(0);
                $("#success").fadeIn(500);
            }
        }
        
    }

    tryAgain()
    {
        location.reload();
    }
}