$(document).ready(function(){


    var key = "AIzaSyB90nzT-0F7xbOR0NpIU1N5HVhDJy0zEic";
    // var playlistId = "PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH"  //javascript 30
    var playlistId = "PL5ZDxMFT4aldNMe9An83jJJH4GOXIrt2X"  //라푼젤
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

        var options ={
            part: 'snippet',
            key: key,
            maxResults: 50,
            playlistId: playlistId,
        }

        var prevToken,nextToken;


        loadVids();


        function  loadVids(){
            
            $.getJSON(URL, options, function(data){
                var id = data.items[0].snippet.resourceId.videoId;
                mainVid(id);
                resultsLoop(data); 


                if(data.nextPageToken)nextToken = data.nextPageToken;
                if(data.prevPageToken)prevToken = data.prevPageToken;
            })
        }


        function mainVid(id){
            $('#video').html(`
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1&loop=1&cc_load_policy=1rel=0&amp;showinfo=0&playlist=${id}" frameborder="0" allowfullscreen></iframe>
            
            `);
            //<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1&loop=1;" frameborder="0" allow="accelerometer; autoplay; loop; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            //<iframe width="100%" height="100%" src="https://www.youtube.com/embed//${id}?autoplay=1&loop=1&cc_load_policy=1rel=0&amp;controls=0&amp;showinfo=0&playlist=Yo19ZhO7CAc" frameborder="0" allowfullscreen></iframe>
        }

        function resultsLoop(data){

            
            $('main').html('');

            console.log(data);

            $.each(data.items, function(i,item){
                try {
                    var thumb = item.snippet.thumbnails.default.url;
                } catch (error) {
                    var thumb = "https://i.ytimg.com/vi/4gYdMC5quJM/default.jpg";    
                }
                var title = item.snippet.title;
                var desc = item.snippet.description.substring(0, 100);
                var vid = item.snippet.resourceId.videoId;



                
                $('main').append(`
                <article class="item" data-key="${vid}">
                    <img src="${thumb}" alt=""  class="thumb">
                    <div class="details">
                        <h4>${title}</h4>
                        <p>${desc}</p>
                    </div>
                </article>
                `);

            });
        }

        $('main').on('click','article',function(){
            var id = $(this).attr('data-key');
            mainVid(id);
        });
        


        $(document).on('click','body .btn-srch',function(){
            playlistId = $('input').val();
            if(playlistId ==='') return;
            options.playlistId = playlistId;
            loadVids();
        })

        $(document).on('click','body .btn-next',function(){
            options.pageToken = nextToken;
            loadVids();
        })

        $(document).on('click','body .btn-prev',function(){
            options.pageToken = prevToken;
            loadVids();
        })

});
