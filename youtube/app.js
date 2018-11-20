$(document).ready(function(){


    var key = "AIzaSyB90nzT-0F7xbOR0NpIU1N5HVhDJy0zEic";
    var playlistId = "PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH"
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

        var options ={
            part: 'snippet',
            key: key,
            maxResults: 30,
            playlistId: playlistId,

        }

        loadVids();


        function  loadVids(){
            
            $.getJSON(URL, options, function(data){
                var id = data.items[0].snippet.resourceId.videoId;
                mainVid(id);
                resultsLoop(data); 
            })
        }


        function mainVid(id){
            $('#video').html(`
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `);
        }

        function resultsLoop(data){

            
            $('main').html('');

            $.each(data.items, function(i,item){
                var thumb = item.snippet.thumbnails.medium.url;
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
        


        $(document).on('click','body button',function(){
            playlistId = $('input').val();
            if(playlistId ==='') return;
            options.playlistId = playlistId;
            loadVids();
        })

});
