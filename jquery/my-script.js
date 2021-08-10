$(document).ready(function () {
    let maxResults = 50;
    let uploadsID = "";
    let nextPageToken = "";
    let prevPageToken = "";
    let output = "";
    let totalResults = "";
    let resultsPerPage = 50;

    //https://www.youtube.com/c/mindroastermir
    let id = 'UC_IX1tEg3Gtei2spYVGt42A';
    let ApiKey = '[put-your-youtube-api-here]';

    getUploadId();

    function getUploadId() {
        output = "";
        $('#results').empty();
        $.get(
            "https://www.googleapis.com/youtube/v3/channels", {
                part: 'contentDetails',
                id: id,
                key: ApiKey
            },
            function (data) {
                $.each(data.items, function (i, item) {
                    console.log(item.contentDetails.relatedPlaylists.uploads);
                    uploadsID = item.contentDetails.relatedPlaylists.uploads;
                    getVids(uploadsID);
                });
            }
        );
    }

    function getVids(uploadsID) {
        // while (nextPageToken !== undefined) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: maxResults,
                playlistId: uploadsID,
                // nextPageToken: nextPageToken,
                pageToken: nextPageToken,
                key: ApiKey
            },
            function (data) {

                // console.log("data: ", data);
                console.log("data: ", data);
                let videos = data.items;
                nextPageToken = data.nextPageToken;
                prevPageToken = data.prevPageToken;

                resultsPerPage = data.pageInfo.resultsPerPage;
                totalResults = data.pageInfo.totalResults;
                let pagesCount = totalResults / resultsPerPage;
                console.log('pagesCount: ', pagesCount);

                $('#pagination').html('<p>' + Math.round(pagesCount) + '-' + totalResults + '</p>');


                $.each(videos, function (i, video) {
                    // console.log(video);
                    let title = video.snippet.title;
                    let videoId = video.snippet.resourceId.videoId;
                    let description = video.snippet.description;
                    let publishedAt = video.snippet.publishedAt;
                    let thumbnails = video.snippet.thumbnails;
                    let thumbDefault = thumbnails.default;
                    let thumbHigh = thumbnails.high;
                    let thumbMaxres = thumbnails.maxres;
                    let thumbMedium = thumbnails.medium;
                    let thumbStandard = thumbnails.standard;
                    let VideoOwnerChannelTitle = video.snippet.VideoOwnerChannelTitle;

                    output = "<div style='float:left; width:400px; height:200px;margin: 15px; margin-bottom: 80px;'>";
                    output += "<a href='watch.html?v=" + videoId + "' target='_blank'>";
                    if (thumbStandard !== undefined) {
                        output += "<img style='width:400px; height: 200px;' src='" + thumbStandard.url + "'>";
                    } else {
                        output += "<img style='width:400px; height: 200px;' src='" + thumbDefault.url + "'>";
                    }
                    output += "</a>";
                    output += "<p>" + title + "</p>";
                    output += "<p>" + publishedAt + "</p>";
                    // output += "<p>" + description + "</p>";
                    output += "</div>";
                    $('#results').append(output);
                });
            });
        //}
    }

    $('#next').click(function () {
        getUploadId();
    });

    $('#prev').click(function () {
        getUploadId();
    });



});