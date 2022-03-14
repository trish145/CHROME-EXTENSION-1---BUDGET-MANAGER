$(function(){

    chrome.storage.sync.get('limit',function(budget){
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function(){
        //retrive the value of the input box
        //storing the value in variable called "limit"
        var limit = $('#limit').val();
        if (limit){
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            });
        }
    });

    //if user clicks on reset total, reset the total value to zero
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': null}, function(){
          
            var notifOptions = {
                type: "basic",
                iconUrl: "icon128.png",
                title: "Resetting Total",
                message: "Total has been reset to 0."
            }
           
            chrome.notifications.create('resetNotif', notifOptions);
            chrome.notifications.clear('limitNotif');
           
        });
    });
});