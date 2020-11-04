Template.SentenceSelectionButton.events({

    'click a': function(event, template) {
        var currPage = getCurrPage();
        var currHighlightColor = "highlight" + this.highlight;
        var currElementClassName = document.getElementById("selectedSentence").className;
        var toggled = false;
        reactivatePage();

        if (currElementClassName.includes(currHighlightColor)) {
            // The selected sentence has been already highlighted
            document.getElementById("selectedSentence").classList.remove(currHighlightColor);
            toggled = true;
            // } else if (currElementClassName.includes("highlight")) {
            //     // The selected sentence has been highlighted in another color
            //     location.href = "#";
            //     location.href = "#popup-warning-3";
        } else {
            // The selected sentence has NOT been highlighted in this color
            if (currHighlightColor == "highlight" + METHOD_HIGHLIGHT_COLOR1 &&
                currPage.includes("Paper1Page3") &&
                document.getElementById('begining-paragraph-NOT-exists').checked) {
                location.href = "#";
                location.href = "#method-popup-warning-checkbox";
                return false;
            }

            var sentence = document.getElementById("selectedSentence")
            sentence.classList.remove("highlight" + ABSTRACT_HIGHLIGHT_COLOR1);
            sentence.classList.remove("highlight" + METHOD_HIGHLIGHT_COLOR1);
            sentence.classList.remove("highlight" + METHOD_HIGHLIGHT_COLOR2);
            sentence.classList.add(currHighlightColor);
            toggled = true;
        }
        //document.getElementById("highlightBox").style.display = "none";
        document.getElementById("selectedSentence").id = "";
        if (toggled) {
            if (currPage.includes('Paper1Page2')) {
                refreshAbstractSelectionDisplay(ABSTRACT_HIGHLIGHT_COLOR1);
            } else if (currPage.includes('Paper1Page3')) {
                if (currHighlightColor == "highlight" + METHOD_HIGHLIGHT_COLOR1) {
                    refreshMethodMainClaimSelectionDisplay(METHOD_HIGHLIGHT_COLOR1);
                } else {
                    refreshMethodMainStepSelectionDisplay(METHOD_HIGHLIGHT_COLOR2);
                }
            }
        }
    },
});