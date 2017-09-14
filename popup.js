$(function(){
  // Ensure the current value in chrome storage is always displayed
  chrome.storage.sync.get(['total', 'limit'], function(budget){
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  });

  $('#spendAmount').click(function(){
    // get total from Chrome storage API
    chrome.storage.sync.get(['total', 'limit'], function(budget){
      var newTotal = 0;
      if (budget.total){
        newTotal += parseInt(budget.total);
      }

      var amount = $('#amount').val();
      if (amount){
        newTotal += parseInt(amount);
      }
      // send storage value back to Chrome storage API
      chrome.storage.sync.set({ 'total': newTotal}, function(){
        if (amount && newTotal >= budget.limit){
          var notifOptions = {
            type: 'basic',
            iconUrl: '48icon.png',
            title: 'Limit reached!!',
            message: 'Bank Otuch, pesa orumo!!!'
          };
          chrome.notifications.create('limitNotif-', notifOptions);
        }
      });
      // update the UI
      $('#total').text(newTotal);
      // clear input box
      $('#amount').val('');
    });
  });

  $('#clearAmount').click(function(){
    chrome.storage.sync.set({ 'total': 0});
    $('#total').text(0);
  });
});
