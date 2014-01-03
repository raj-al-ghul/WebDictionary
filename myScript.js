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
    
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        
        if (!entry.getElementsByTagName("fl")[0]) {
            continue;
        }
        
        definitions.push({
            defintion: entry.getElementsByTagName("fl")[0].childNodes[0].nodeValue,
            figureOfSpeech: entry.getElementsByTagName("fl")[0].childNodes[0].nodeValue
        });
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
    var val = $('#fld').val();
    
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