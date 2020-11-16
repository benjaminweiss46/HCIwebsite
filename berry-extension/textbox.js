function visualize() {
    
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                textbox = document.getElementById("history");
			    textbox.value = allText;
            }
        }
    }
    rawFile.send(null);
}

document.addEventListener('DOMContentLoaded', function() {
    var sub = document.getElementById('sub');
    // onClick's logic below:
    sub.addEventListener('click', function() {
        document.getElementById("history").value = "Fifth Avenue, New York City";
        readTextFile("/Users/glenxu/Documents/Zoom/2020-11-16 07.05.45 Glen Xu's Zoom Meeting 81879934244/meeting_saved_chat.txt");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var vis = document.getElementById('vis');
    // onClick's logic below:
    sub.addEventListener('click', function() {
        
    });
});