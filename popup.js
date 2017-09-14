$(function(){
  // Ensure the current value in chrome storage is always displayed
  chrome.storage.sync.get('total', function(budget){
    $('#total').text(budget.total);
  });

  $('#spendAmount').click(function(){
    // get total from Chrome storage API
    chrome.storage.sync.get('total', function(budget){
      var newTotal = 0;
      if (budget.total){
        newTotal += parseInt(budget.total);
      }

      var amount = $('#amount').val();
      if (amount){
        newTotal += parseInt(amount);
      }
      // send storage value back to Chrome storage API
      chrome.storage.sync.set({ 'total': newTotal});
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
