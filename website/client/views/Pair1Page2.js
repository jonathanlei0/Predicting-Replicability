Template.Pair1Page2.onCreated(function() {})

Template.Pair1Page2.onRendered(function() {
    var id1 = glob.currPaperExpIdList[0];
    var id2 = glob.currPaperExpIdList[1];

    // Title part
    document.getElementById("studyTitle1").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id1 + ".txt") + "</em>";
    document.getElementById("studyTitle2").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id2 + ".txt") + "</em>";


    // Abstract part
    document.getElementById("abstractText1").innerHTML =
        "<b>Abstract: </b>" + httpGet("/paper_data/abstract/[abstract]" + id1 + ".txt");
    document.getElementById("abstractText2").innerHTML =
        "<b>Abstract: </b>" + httpGet("/paper_data/abstract/[abstract]" + id2 + ".txt");


    // Method part
    document.getElementById("methodText1").innerHTML =
        "" + httpGet("/paper_data/method/[method]" + id1 + ".txt")

    document.getElementById("methodText2").innerHTML =
        "" + httpGet("/paper_data/method/[method]" + id2 + ".txt")

});


Template.Pair1Page2.events({
    "click .nav-link": function() {
        location.href = "#/";
        location.href = "#/";
    }
})