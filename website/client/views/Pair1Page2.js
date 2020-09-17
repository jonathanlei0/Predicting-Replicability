Template.Pair1Page2.onCreated(function() {
    //mySessionStorage.set('paper_list', [4, 5]);
    currPage = "Pair1Page2";
})

Template.Pair1Page2.onRendered(function() {
    var paper_list = mySessionStorage.get('paper_list');
    var id1 = paper_list[0];
    var id2 = paper_list[1];
    document.getElementById("studyTitle1").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id1 + ".txt") + "</em>";

    document.getElementById("abstractText1").innerHTML =
        "<b>Abstract: </b>" + httpGet("/paper_data/abstract/[abstract]" + id1 + ".txt");

    document.getElementById("methodText1").innerHTML =
        "" + httpGet("/paper_data/method/[method]" + id1 + ".txt")


    document.getElementById("studyTitle2").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id2 + ".txt") + "</em>";

    document.getElementById("abstractText2").innerHTML =
        "<b>Abstract: </b>" + httpGet("/paper_data/abstract/[abstract]" + id2 + ".txt");

    document.getElementById("methodText2").innerHTML =
        "" + httpGet("/paper_data/method/[method]" + id2 + ".txt")

});