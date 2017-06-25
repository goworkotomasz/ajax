'use strict';

//  Definicja funkcji ajax
function ajax( ajaxOptions ) {
    
//  Opcje połączenia i jego typu
    var options = {
        type: ajaxOptions.type || 'POST',
        url:  ajaxOptions.url || '',
        onError: ajaxOptions.onError || function() {},
        onSuccess: ajaxOptions.onSuccess ||function() {},
        dataType: ajaxOptions.dataType || 'text'
    }
    
    function httpSuccess( httpRequest ) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 ||
            httpRequest.status == 304 || 
//    Dotyczy przeglądarek safari 
            navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch(e) {
            return false;
        }
    }
    
//   Utworzenie okiektu XMLHttpRequest
    var httpReq = new XMLHttpRequest();
    
//   Otwarcie połączenia
    httpReq.open(options.type, options.url, true);
    
//   Iterowane za kazdym razem, kiedy zmienia sie ready state - od 0 do 4
    httpReq.onreadystatechange = function() {
//   Sprawdz status połączenia - funkcja httpSuccess
        if( this.readyState == 4 ) {
            if ( httpSuccess( this )) {
                
//    Jesli dane w formacie XML, to zwroc obiekt sresponseXML, w przeciwnym wypadku responseText
                
                var returnData = (options.dataType=='xml')? this.responseXML :
                this.responseText;
                
                options.onSuccess(returnData);
                
                
                httpReq = null;
            } else {
                options.onError(console.log('błąd'));
            }
        }
    }
    httpReq.send();
}

ajax({
    type: 'GET',
    url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl',
    onError: function(msg){
        console.log(msg);
    },
    onSuccess: function(response) {
        var jsonObj = JSON.parse(response);
        console.log(jsonObj);
        console.log(jsonObj.userId);
        console.log(jsonObj.userName);
        console.log(jsonObj.userURL);
        
        var userID = jsonObj.userId;
//        $('testowy').text(userID);
        
        document.getElementById('testowy').innerHTML = jsonObj.userId;
//        document.write(jsonObj.userId);
    }
});