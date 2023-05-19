const l=console.log;
const $=ip=>document.querySelector(`#${ip}`)||document.querySelector(`.${ip}`);

async function get(x){
    let response=await fetch(x)
    .then(response => response.json())
    .then(data => data);
    return await response;
}

async function post(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res=> res.json())
    return await response; // parses JSON response into native JavaScript objects
}
