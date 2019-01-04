$(document).ready(function(){


    var key = "AIzaSyB90nzT-0F7xbOR0NpIU1N5HVhDJy0zEic";
    // var playlistId = "PLJUYgaCc1xMHn9w-KQ8S9kieA3vm8Vtt_"
    var playlistId = "PL5ZDxMFT4aldNMe9An83jJJH4GOXIrt2X"
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

        var options ={
            part: 'snippet',
            key: key,
            maxResults: 50,
            playlistId: playlistId,
        }

        loadVids();


        function  loadVids(){
            $.getJSON(URL, options, function(data){
                console.log(data);
                var id = data.items[0].snippet.resourceId.videoId;
                mainVid(id);
                resultsLoop(data); 
                
            })
        }


        function mainVid(id){
            $('#video').html(`
            <iframe id="ifr" width="100%" height="100%" style="box-sizing: border-box;position:absolute; top:0;left:0;right:0;bottom:0;"
            sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
            frameborder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            src="video.html"
            >
            </iframe>
            `);
            sendChildMessage(id);
        }

        // <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?playsinline=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        function resultsLoop(data){
            $('main').append(`<button class="btn">click</button>`)
            $.each(data.items, function(i,item){
                try {
                    var thumb = item.snippet.thumbnails.default.url;
                } catch (error) {
                    var thumb = "https://i.ytimg.com/vi/4gYdMC5quJM/default.jpg";    
                }
                var title = item.snippet.title;
                var desc = item.snippet.description;
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

        function resultsLoop2(data){
            $('main').html('');
            console.log(data);
            $.each(data.items, function(i,item){
                var thumb = item.snippet.thumbnails.medium.url;
                var title = item.snippet.title;
                // var desc = item.snippet.description.substring(0, 20);
                var desc = item.snippet.description;
                var pid = item.id.videoId;
                $('main').append(`
                <article class="item" data-key="${pid}">
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
           // mainVid(id);
           // 자식 iframe 에 전달
           sendChildMessage(id);
        });
        
        $('input').on('change',function(e){
            // console.log(e.target.value, 'check)');
            var opt={
                part: 'snippet',
                key: key,
                maxResults: 20,
                q:e.target.value
            }
            
            // https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${val || defaultKeyword}&part=snippet&type=video&maxResults=${max}
            search(`https://www.googleapis.com/youtube/v3/search?part=snippet
            &q=${e.target.value}
            &type=video
            &key=${key}`,opt);
            /* var id = $(this).attr('data-key');
            mainVid(id); */
        });



        
          function search(URL,opt) {
            $.getJSON(URL, opt, function(data){
                console.log(data);
                // var id = data.items[0].snippet.resourceId.videoId;
                // mainVid(id);
                resultsLoop2(data); 
            })
          }


    // 자식 iframe 이벤트 등록
       window.addEventListener("message", processFn, false);		
    
    // 자식 iframe 이벤트 적용
        function processFn(event) {
            var bla = event.data;
            console.log('parent',bla);    
        }
    
        
    
        // 자식 iframe 으로 인자 전달
        function sendChildMessage(id) {	
            // console.log('sendCh');
            document.getElementById("ifr").contentWindow.postMessage(id, '*');
    
        }	
        

});
