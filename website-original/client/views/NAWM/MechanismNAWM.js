var runExample = function(idx) {
    var prefix = "exam" + idx;
    var p1, w1;
    if (idx == '1') {
        p1 = parseFloat(document.getElementById(prefix + 'Pred1').value);
        w1 = parseFloat(document.getElementById(prefix + 'Point1').innerHTML);
        document.getElementById(prefix + 'Pred1Box').value = p1.toFixed(1);
    } else if (idx == '2') {
        p1 = parseFloat(document.getElementById(prefix + 'Pred1').innerHTML);
        w1 = parseFloat(document.getElementById(prefix + 'Point1').value);
        document.getElementById(prefix + 'Point1Box').value = w1.toFixed(0);
    }
    var p2 = parseFloat(document.getElementById(prefix + 'Pred2').innerHTML);
    var p3 = parseFloat(document.getElementById(prefix + 'Pred3').innerHTML);
    var w2 = parseFloat(document.getElementById(prefix + 'Point2').innerHTML);
    var w3 = parseFloat(document.getElementById(prefix + 'Point3').innerHTML);
    console.log([p1, p2, p3, w1, w2, w3]);
    var pay = threePlayersNAWM(p1, w1, p2, w2, p3, w3);
    console.log(pay);
    fillExampleResult(document.getElementById('example' + idx), pay, w1);
};

Template.MechanismNAWM.events = {
    'input #exam1Pred1': function(event, instance) {
        runExample('1');
    },
    'input #exam2Point1': function(event, instance) {
        runExample('2');
    }
};


Template.MechanismNAWM.rendered = function() {
    $('html,body').scrollTop(0);
    runExample('1');
    runExample('2');
    log(workerId, 'Mechanism');
};