// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('addButton').addEventListener('click', function () {
//         const query = document.getElementById('addData').value;
//         sendData('POST', 'https://seahorse-app-2h8zb.ondigitalocean.app/add', {query: query});
//     });

//     document.getElementById('retrieveButton').addEventListener('click', function () {
//         const query = document.getElementById('retrieveData').value;
//         sendData('GET', 'https://seahorse-app-2h8zb.ondigitalocean.app/retrieve?query=' + encodeURIComponent(query));
//     });

//     function sendData(method, url, data) {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url, true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 document.getElementById('output').innerHTML = xhr.responseText;
//             }
//         };
//         xhr.send(JSON.stringify(data));
//     }
// });
function renderTable(data, container) {
    container.innerHTML = ''; // clear
    const table = document.createElement('table');
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    container.appendChild(table);
}

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const insertButton = document.getElementById('insert');
    const submitButton = document.getElementById('submit');
    const textbox = document.getElementById('textarea');
    const responseArea = document.getElementById('res-area');

    insertButton.textContent = messages.insertButtonText;
    submitButton.textContent = messages.submitButtonText;

    insertButton.addEventListener('click', () => {
        const jsonStatement = {
            "sql": "INSERT INTO patient (name, dateOfBirth) VALUES ('Sara Brown', '1901-01-01'), ('John Smith', '1941-01-01'), ('Jack Ma', '1961-01-30'), ('Elon Musk', '1999-01-01');"
        }
        const statement = JSON.stringify(jsonStatement);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://seahorse-app-2h8zb.ondigitalocean.app/api/query/');
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const responseData = JSON.parse(xhr.responseText);
                renderTable(responseData, responseArea);
            }
        };
        xhr.send(statement);
    });

    submitButton.addEventListener('click', () => {
        const method = textbox.value.trim().substring(0, 6).toUpperCase() === 'SELECT' ? 'GET' : 'POST';
        const endpoint = method === 'POST' ?
            'https://seahorse-app-2h8zb.ondigitalocean.app/api/query/'
            : `https://seahorse-app-2h8zb.ondigitalocean.app/?sql=${textbox.value}`;
        const xhr = new XMLHttpRequest();
        xhr.open(method, endpoint);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.onload = () => {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                renderTable(responseData, responseArea);
            } else {
                alert(messages.errorText + ' ' + xhr.statusText);
            }
        };
        xhr.send(textbox.value);
    });
});