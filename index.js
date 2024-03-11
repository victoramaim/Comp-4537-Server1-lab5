document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addButton').addEventListener('click', function () {
        var query = document.getElementById('addData').value;
        sendData('POST', 'https://urchin-app-lradi.ondigitalocean.app/add', {query: query});
    });

    document.getElementById('retrieveButton').addEventListener('click', function () {
        var query = document.getElementById('retrieveData').value;
        sendData('GET', 'https://urchin-app-lradi.ondigitalocean.app/retrieve?query=' + encodeURIComponent(query));
    });

    function sendData(method, url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById('output').innerHTML = xhr.responseText;
            }
        };
        xhr.send(JSON.stringify(data));
    }
});
