
async function postUrl(event) {
  event.preventDefault();

  const DOMAIN_NAME = window.location.origin;
  var longurl = document.getElementsByClassName('long-url')[0].value;
  var raw = JSON.stringify({ "longurl": longurl });
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: raw,
    redirect: 'follow'
  };
  var id = null;
  var pos = 0;
  var container = document.getElementById('container');
  container.innerHTML = longurl;

  id = setInterval(frame, 1);

  fetch(`${DOMAIN_NAME}/url/longurl`, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(result => {
      if(result.message){
        document.getElementsByClassName('short-url')[0].innerHTML = result.message;
      }else{
        document.getElementsByClassName('short-url')[0].innerHTML = result.results.shorturl;
      }
      document.getElementById('container').style.removeProperty( 'display' );
    })
    .catch(error => {
      console.log('error', error);
    })
    
function frame() {
  if (pos == 230) {
    clearInterval(id);
    id= null;
    container.style.display = 'none';
  } else {
    pos++;
    container.style.top = pos + 'px';
  }
}

}
