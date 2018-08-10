const URL_BASE = 'https://api.foursquare.com/v2/venues/';
const AUTH = 'client_id=NYPOUAQ1NRYJK3FXJBWMEM5JQRWGWKEEKO1KMZRAKTPLRG2V&client_secret=OJ4LVZXPW24UVGEMSDFETLOM3TBS4YCGEVFBHYHKQZRPCZ3W';
const VERSION = '&v=20180809';
const QUERY_BASE = AUTH + VERSION;

function getInformationByLatLng(lat, lng, infoWindow, title){
    const urlSearch = URL_BASE + 'search?limit=1&ll=' + lat + ',' + lng + '&' + QUERY_BASE;
    $.ajax({
        url: urlSearch,
        dataType: 'json',
        success: function(res){
            if(res.meta.code === 200 && res.response.venues !== null){
                const id = res.response.venues[0].id;
                const urlId = URL_BASE + id + '?' + QUERY_BASE;
                $.ajax({
                    url: urlId,
                    dataType: 'json',
                    success: function(res){
                        if(res.meta.code === 200){
                            console.log(res.response.venue.likes.count);
                            console.log(res.response.venue.description);
                            const content = setSucessContent(title, res.response.venue.likes.count);
                            infoWindow.setContent(content);
                        }
                    },
                    error: function() {
                        const content = setFailureContent(title);
                        infoWindow.setContent(content);
                    }
                });

            }else{
                const content = setFailureContent(title);
                infoWindow.setContent(content);
            }
        },
        error: function() {
            const content = setFailureContent(title);
            infoWindow.setContent(content);
        }
    });
}

function setSucessContent(title, likes){
    let content = '<h6>' + title + '<h6>';
    content += '<span class="badge badge-primary">' + likes + ' people likes this. (by FourSquare)<span>' 
    return content;
}

function setFailureContent(title){
    let content = '<h6>' + title + '<h6>';
    content += '<span class="badge badge-warning">it is not possible get additional info.<span>' 
    return content;
}