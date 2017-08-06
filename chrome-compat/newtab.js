var wide = document.getElementById('topsites').offsetWidth;
document.getElementById('topsites').style.marginLeft = 0 + "px";
console.log('hello1');

function onAnchorClick(event) {
  chrome.tabs.create({ url: event.srcElement.href });
  return false;
}

function buildSiteList(mostVisitedURLs) {
  var popupDiv = document.getElementById('topsites');
  var ul = popupDiv.appendChild(document.createElement('ul'));
  ul.className = 'list-group';

  mostVisitedURLs.splice(12);

  for (var i = 0; i < mostVisitedURLs.length; i++) {
    var li = ul.appendChild(document.createElement('li'));
    li.className = 'list-group-item';
    var a = li.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
    a.addEventListener('click', onAnchorClick);
  }
}

chrome.topSites.get(buildSiteList);

var VERSION = 1;

//notes
(function() {

  function _makeDelayed() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }

  function bindNoteHandlers() {
    var elem = document.getElementById('note-content'),
        saveHandler = _makeDelayed();
    function save() {
      chrome.storage.sync.set({'noteText': elem.value});
    }
    // Throttle save so that it only occurs after 1 second without a keypress.
    elem.addEventListener('keypress', function() {
      saveHandler(save, 1000);
    });
    elem.addEventListener('blur', save);
    chrome.storage.sync.get('noteText', function(data) {
      elem.value = data.noteText ? data.noteText : '';
    });
  }

  bindNoteHandlers();
})();

//toggle top sites sidebar
function showTopSites(event) {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  if(sidebar.style.marginLeft == "0px" || sidebar.style.marginLeft == null) {
      sidebar.style.marginLeft = -width + "px";
      console.log("shrink");
  } else {
      sidebar.style.marginLeft = "0px";
      console.log("grow");
  }
}

var toggleID = document.getElementById('toggle');
toggleID.onclick = showTopSites;