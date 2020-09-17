<script>
    var id = sessionStorage['sesP1'];
    function httpGet(theUrl) {
      if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      }
      else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          return xmlhttp.responseText;
        }
      }
      xmlhttp.open("GET", theUrl, false);
      xmlhttp.send();
      return xmlhttp.responseText;
    }

    document.getElementById("abstractText").innerHTML =
      "<b>Abstract: </b>" + httpGet("/paper_data/abstract/[abstract]" + id + ".txt");

    document.getElementById("studyTitle").innerHTML =
      "Study Title: " + httpGet("/paper_data/title/[title]" + id + ".txt");


  </script>