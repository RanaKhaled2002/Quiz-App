import { Quiz } from "./quiz.js";

export class Setting
{
    constructor()
    {
        $("#startBtn").click(this.getValue.bind(this))
    }

    // get api
    async api(category,type,numberOfQuestion)
    {
        let apiLink = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${type}`);
        apiLink = await apiLink.json();
        return apiLink.results;
    }

    // get value from inputs
    async getValue()
    {
        let category = $("#select").val();
        let type = $("input[name='difficulty']:checked").val();
        let numberOfQuestion = $("#numberOfQuestion").val();
        if(numberOfQuestion=="" ||numberOfQuestion==0)
        {
            $("#message").html("Please Enter Number Of Questions");
            $("#message").fadeIn(500);
        }
        else if(numberOfQuestion>50)
        {
            $("#message").html("Maximum Value Of Question Is 50 Please Enter Right Number");
            $("#message").fadeIn(500);
        }
        else
        {
            $("#message").fadeOut(500);
            let apiData = await this.api(category,type,numberOfQuestion);
            if(apiData.length == 0)
            {
                $("#message").html("Sorry We Do Not Have These Number Of Questions");
                $("#message").fadeIn(500);
            }
            else
            {
                let quiz = new Quiz (apiData);
                $("#setting").fadeOut(0);
                $("#quiz").fadeIn(500);
            }
            
        }
    }
    
}