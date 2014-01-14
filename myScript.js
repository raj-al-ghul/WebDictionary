var lastRequest,
    //this is the div where definitions go
    def,
    //this is the loading indicator
    loading;

//Value: word to define
//Callback: function, first parameter is an array of definitions
function getDefinition(value, callback) {
    /**
    Every time the button (define) is clicked, it should display the definition
    of the word in the text field. if there is nothing in the texfield, or just spaces,
    display a custom message -R
    */

    var url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+value+"?key=d80f7be3-6077-44bb-856b-30f936d0c662";
    
    if (lastRequest) {
        lastRequest.abort();
    }
    
    if (!value) {
        callback();
        return;
    }
    
    lastRequest = $.get(url, function(response) {
        lastRequest = null;
        
        callback(
            parseResponse(response)
        );
    }).error(function() {
        //API is down
    });
    
}

function parseResponse(response)
{
    // do stuff with the response
    
    var xmlDoc = response,
        entries = xmlDoc.getElementsByTagName("entry"),
        definitions = [];
    
    /* only displaying the first two entries */
    for (var i = 0; i < 2; i++) {
        var entry = entries[i];
        
        if (!entry.getElementsByTagName("fl")[0]) {
            continue;
        }
                
        var deffs = entries[i].getElementsByTagName("def");
        
        for (var i = 0; i < deffs.length; i++) {
            var actualDef = deffs[i];
            
            var strWithColon = actualDef.getElementsByTagName("dt")[0].childNodes[0].nodeValue;
            var strWithoutColon = strWithColon.substring(1,strWithColon.length);
            definitions.push({
                defintion: strWithoutColon,
                figureOfSpeech: entry.getElementsByTagName("fl")[0].childNodes[0].nodeValue
            });
            
        }
        /* My new buggy code */
        
        

    }
    
    return definitions;
}

function renderDefintions(definitions) {
    var template, string;
    
    if (!definitions) {
        def.html("");
        return;
    }
    
    template = $('#defintionTmpl').html();
    string = Mustache.to_html(template, {
        definitions: definitions
    });
    
    def.html(string);
}

function clickHandler() {
    
    /* Get the word from #fld text input field */
    var str_withcapitals = $('#fld').val();
    /* turn into lower case - API has probs with upper case */
    var val = str_withcapitals.toLowerCase();
    
    loading.show();
    def.hide();
    getDefinition(val, renderDefintions);
    loading.hide();
    def.show();
}

$(function() {
    loading = $('.loading');
    def     = $("#def");
    
    $('input').on("input", clickHandler);
    $("#btton").click(clickHandler);
});