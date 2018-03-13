
function loadData() {
    //these jquery variables that we can use in jquery methods.
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();
    var string ="<img class='bgimg' src="+"'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + street+" "+city +"'>";
    $("body").append(string);
    var nyUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3e4b9d5441d24ceaabc95992467cb64a&q=" + city;
    //ajax request for nytimes articles.
    $.getJSON(nyUrl,function(data){
        console.log(typeof data);// it is javascript object notation, which is a sexy notation, easy and awesome
        $("#nytimes-header").text("New York times article about "+ city);
        var articleList=data.response.docs;
        var parentArticle = $("#nytimes-articles");
        for(var i = 0; i < articleList.length; i++){
            var article = articleList[i];
            var newListElement="<li class='article'>"+"<a href='"+article.web_url+"'>"+article.headline.main +"</a>"+
            "<p>"+article.snippet+"</p>"+
            "</li>";
            parentArticle.append(newListElement);
        }
    }).error(function(){
        // Here we  do something, if internet is broke or you don't have internet, than ajax request can not happen
        //so we will handle error here.
        $("#nytimes-header").text("New York times article can not be loaded, so go and have fun.");
    });

    //ajax request for wikipedia articles
    var wikiLink='http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json';
    $.ajax(wikiLink,{dataType:"jsonp"}).done(function(data){
        $("#wikipedia-header").text("Wikipedia links related to " + city);
        for(var i = 1;i<data.length;i++){
            wikiLinkHead =data[1][i];
            wikiLinkURL =data[3][i]
            $wikiElem.append('<li><a href="' +wikiLinkURL+ '">'+wikiLinkHead+'</a>');
        }
        console.log(data);
    }).error(function(){
        $("#wikipedia-header").text("you haven't learned about ajax its simple.");
    });
    return false;
};


$('#form-container').submit(loadData);
