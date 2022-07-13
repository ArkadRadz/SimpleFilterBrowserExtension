function sendIdentifier() {  
  let querying = browser.tabs.query({currentWindow: true, active: true});
  querying.then(logTabs, onError);
}

function logTabs(tabs) {
  let cssIdentifier = document.getElementById('css-input').value;

  browser.tabs.executeScript(tabs[0].id, {
    code: 'Array.from(document.getElementsByClassName("' + cssIdentifier + '")).map(el => el.href);'
  }).then(countElements, onError);
}

function countElements(domElements) {
  let count = document.getElementById('result-count');
  let list = document.getElementById('result-list');
  
  count.textContent = `Found ${domElements[0].length} elements`;

  for (let domElement of domElements[0]) {
    let li = document.createElement('li');
    li.textContent = domElement;
    list.appendChild(li);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}


document.getElementById('search-btn').addEventListener('click', sendIdentifier);