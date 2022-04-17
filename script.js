const getRequest = async(event) => {
  event.preventDefault();
  let url = "https://api.github.com/users/caions";
  let req = new XMLHttpRequest()
  req.open("GET",url);
  req.onload = () => {
    if (req.status == 200) {
      let result = JSON.parse(req.responseText)
      document.getElementById('nome').value = result.name;
      document.getElementById('email').value = result.html_url;
      document.getElementById('textArea').value = result.bio;
    } else {
      alert("Error: " + req.status);
    }
  }
  req.send()
}

document.getElementById('button').addEventListener(
  'click', getRequest
);

