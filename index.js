document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addButton').addEventListener('click', function () {
        const query = document.getElementById('addData').value;
        sendData('POST', 'https://seahorse-app-2h8zb.ondigitalocean.app/add', {query: query});
    });

    document.getElementById('retrieveButton').addEventListener('click', function () {
        const query = document.getElementById('retrieveData').value;
        sendData('GET', 'https://seahorse-app-2h8zb.ondigitalocean.app/retrieve?query=' + encodeURIComponent(query));
    });

    function sendData(method, url, data) {
        const xhr = new XMLHttpRequest();
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
