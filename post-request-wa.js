function parseResponse(str) {
    try {
        return JSON.parse(str)
    } catch (e) {
        return {
            body: str
        }
    }
}

function mocaSendData(data, endpoint, dlEvent, dlVar) {
    var xhr = new XMLHttpRequest;
    var stringifiedData = JSON.stringify(data);
    xhr.open("POST", endpoint);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.withCredentials = true;
    xhr.send(stringifiedData);
    xhr.onload = function() {
        if (xhr.status.toString()[0] !== "2") {
            console.error(xhr.status + "> " + xhr.statusText)
        }
        if (dlEvent && dlVar) {
            window[dlVar] = window[dlVar] || [];
            var dlAllData = parseResponse(xhr.responseText);
            dlAllData.event = dlEvent;
            dlAllData.status = xhr.status;
            window[dlVar].push(dlAllData)
        }
    }
}


function mocaGetData(containerId) {
    window.dataTagData = {
        document: {
            characterSet: 'UTF-8'
        },
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        screen: {
            width: window.screen.width,
            height: window.screen.height
        },
        dataModel: window.google_tag_manager[containerId].dataLayer.get({
            split: function() {
                return []
            }
        }).event;
    };
    console.log(window.dataTagData);
    return window.dataTagData
}
