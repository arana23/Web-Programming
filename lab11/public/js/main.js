$(function() {
    var $showList = $('#showList');
    var $search_term = $('#search_term');
    var $show = $('#show');

    function isValid(val, type){
        //check if valid image
        if(type=="img"){
            if(val==null){
                return "/public/js/no_image.jpeg";
            }
            else{
                return val.medium;
            }
        }
        if(val==null){
            return "N/A";
        }
        if(typeof val === 'string'){
            if(val.trim() === ''){
                return "N/A";
            }
        }
        if(!val){
            return "N/A";
        }

        if(type== "reg") return val;
        //special cases
        else if(type == "average") return isValid(val.average, "reg");
        else if(type == "name") return isValid(val.name, "reg");
    }
    
//'<img src="/public/js/no_image.jpeg"/>'
    //genres(the entire array in an ul), rating.average, network.name, and summary
    // change to dd / dt except genres 
    function ClickLink(url){
        $.ajax({
            type: 'GET',
            url: url,
            success: function(shows){
                $show.html(`<h1>`+isValid(shows.name, "reg")+`</h1>`
                    + `<img src="`+isValid(shows.image, "img")+`"/>`
                    +`<dl>
                    <dt>Language:</dt>`+`<dd>`+isValid(shows.language, "reg")+`</dd>
                    <dt>Genres:</dt>`+`<ul>`+isValid(shows.genres, "reg")+`</ul>
                    <dt>Rating Avg:</dt>`+`<dd>`+isValid(shows.rating, "average")+`</dd>
                    <dt>Network Name:</dt>`+`<dd>`+isValid(shows.network, "name")+`</dd>
                    <dt>Summary:</dt>`+`<dd>`+isValid(shows.summary, "reg")+`</dd>
                  </dl>`)
            }
        });
    }

    //page load 
    //reference: https://www.youtube.com/watch?v=fEYx8dQr_cQ
    $.ajax({
        type: 'GET',
        url: 'http://api.tvmaze.com/shows',
        success: function(shows){
            $showList.hide();
            $show.hide();
            $('#homeLink').hide();
            $.each(shows, function(i, show){
                $showList.append(`<li><a class="link" href='${show._links.self.href}'>${show.name}</a></li>`);
                //$showList.append('<li><a href="'+movie.url+'">'+movie.name+'</a></li>');
            });
            //unhide value
            $showList.show();

            //if a link is clicked
            $("a.link").on("click", function(event){
                event.preventDefault();
                $showList.hide();
                ClickLink(event.target.href);
                $show.show();
                $('#homeLink').show();
            });
        }
    });

    //OH: on click -> should be tied to a tag (event binder stuff, same thing w search result)
    $('#searchForm').submit((event) => {
        event.preventDefault();
        if($search_term.val().trim() === ''){
            alert("input invalid");
        }
        else{
            var requestConfig = {
                type: 'GET',
                url: 'http://api.tvmaze.com/search/shows?q='+$search_term.val()
            };
    
            $.ajax(requestConfig).then((responseMessage) => {
                $showList.hide();
                $showList.empty();
                $('#homeLink').hide();
                $show.hide();
                //console.log(responseMessage);
                $.each(responseMessage, function(i, show){
                    $showList.append(`<li><a class="link" href='${show.show._links.self.href}'>${show.show.name}</a></li>`);
                });
                $showList.show();
                $('#homeLink').show();
    
                $("a.link").on("click", function(event){
                    event.preventDefault();
                    $showList.hide();
                    $('#homeLink').hide();
                    ClickLink(event.target.href);
                    $show.show();
                    $('#homeLink').show();
                });
            });
        }

    });

});



/*     $('#submit').on('click', function(){
        //console.log($showList);
        $.ajax({
            type: 'GET',
            url: 'http://api.tvmaze.com/search/shows?q='+$search_term.val(),
            success: function(movies){
                $.each(movies, function(i, movie){
                    //console.log("am i working");
                    //empty
                    $showList.empty();
                    //unhide value
                    document.getElementById('showList').style.display = 'block';
                    $showList.append('<li><a href="'+movie.url+'">'+movie.name+'</a></li>');
                });
            },
            error: function(){
                alert("input invalid");
            }
        });
    });

    $("#showList").on("click", function(event){
        event.preventDefault();
        //console.log('clicked');
        //hide showList
        document.getElementById('showList').style.display = 'none';
        $show.empty();
    }); */