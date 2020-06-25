BrowserDetection = function () {
    //Check if browser is IE

    var ua = navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.search('MSIE ');
    if (ua.search('MSIE ')>=0) {
        // IE 10 or older => return version number
        //return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        return "IE";
    }
    if (ua.search('Trident/')>=0) {
        // IE 11 => return version number
        //var rv = ua.indexOf('rv:');
        //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        return "IE";
    }
    if (ua.search('Edge/')) {
        // Edge (IE 12+) => return version number
        //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        return "Edge";
    }
    
    //Check if browser is Chrome
    if (navigator.userAgent.search("Chrome") >= 0) {
        return "Chrome";
    }

    //Check if browser is Firefox 
    if (navigator.userAgent.search("Firefox") >= 0) {
        return "Firefox";
    }

    //Check if browser is Safari
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") <0) {
        return "Safari";
    }

    //Check if browser is Opera
    if (navigator.userAgent.search("Opera") >= 0) {
        return "Opera";
    }
}

threePlayersWSWM = function(p1, w1, p2, w2, p3, w3) {
    if (w2 == 0 && w3 == 0) return [0, 0];

    var BScore = function(x, y) { return 1 - (y - x) * (y - x); };
    var avgPos = w1 * BScore(p1, 1) + w2 * BScore(p2, 1) + w3 * BScore(p3, 1);
    avgPos = avgPos / (w1 + w2 + w3);
    var avgNeg = w1 * BScore(p1, 0) + w2 * BScore(p2, 0) + w3 * BScore(p3, 0);
    avgNeg = avgNeg / (w1 + w2 +w3);
    var pay = [w1 * (BScore(p1, 1) - avgPos), w1 * (BScore(p1, 0) - avgNeg)];

    return pay;
}

threePlayersNAWM = function(p1, w1, p2, w2, p3, w3) {
    if (w2 == 0 && w3 == 0) return [0, 0];

    var p_bar = (1 + ((2 * p2 - 1) * w2 + (2 * p3 - 1) * w3) / (w2 + w3)) / 2;
    var BScore = function(x, y) { return 1 - (y - x) * (y - x); };
    var coef = w1 * (w2 + w3) / (w1 + w2 + w3);
    var pay = [coef * (BScore(p1, 1) - BScore(p_bar, 1)), coef * (BScore(p1, 0) - BScore(p_bar, 0))]

    return pay;
}

fillExampleResult = function(element, pay, wager) {
 console.log(element);
 if (pay[0] < 0) {
        //instance.netpay1.set('<span color="blue"> lose ' + (-pay[0]).toFixed(2) + '</span>');
        element.getElementsByClassName('netGain1')[0].innerHTML = '';
        element.getElementsByClassName('netLose1')[0].innerHTML = 'lose ' + (-pay[0]).toFixed(2);
    } else {
        element.getElementsByClassName('netGain1')[0].innerHTML = 'gain ' + pay[0].toFixed(2);
        element.getElementsByClassName('netLose1')[0].innerHTML = '';
    }
    if (pay[1] < 0) {
        element.getElementsByClassName('netGain2')[0].innerHTML = '';
        element.getElementsByClassName('netLose2')[0].innerHTML = 'lose ' + (-pay[1]).toFixed(2);
    } else {
        element.getElementsByClassName('netGain2')[0].innerHTML = 'gain ' + pay[1].toFixed(2);
        element.getElementsByClassName('netLose2')[0].innerHTML = '';
    }
    element.getElementsByClassName('total1')[0].innerHTML = (pay[0] + wager).toFixed(2);
    element.getElementsByClassName('total2')[0].innerHTML = (pay[1] + wager).toFixed(2);
}