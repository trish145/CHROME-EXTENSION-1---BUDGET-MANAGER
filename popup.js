$(function(){

    //anytime we open we popup we need the previous value
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    // listen to the click event on spend button
    // when we click we need to do something
    $('#spendAmount').click(function(){
        //use of chrome storage api
        //all chrome api's are asynchronous in nature,so it will have call back function
        //along with the total, retrive the limit
        chrome.storage.sync.get(['total','limit'],function(budget){
            var newTotal = 0;
            if(budget.total){  //if total already existing  
                newTotal += parseInt(budget.total); //parseInt for making it as integer 
            }
            //above we've handled both cases, if total was already existing we are adding it to new total, otherwise we're making new total as zero.
            
            //select the input box
            //for the user entered amount, storing it in  variable "amount"
            var amount=$("#amount").val();
            // if user enters amount then update newTotal
            if(amount)
            {
                newTotal += parseInt(amount);
            }
            //now send this newTotal back to the chrome storage
            chrome.storage.sync.set({'total': newTotal},function(){
                if(amount && newTotal >= budget.limit){
                    var notifOptions ={
                        type:"basic",
                        iconUrl: "icon128.png",
                        title: "Limit reached",
                        message: "Oh! Looks like you've reached your limit!"
                    };
                    chrome.notifications.create('limitNotif',notifOptions);
                    chrome.notifications.clear('limitNotif');
                }
            }); //set it with the value newTotal

            //once we've set the value,we need to update our new UPI
            $("#total").text(newTotal); //this is going to update our new total
            $("amount").val(''); //clear out the input box

            
            
        }) ;   

    });
});