// *****************************************************
// check user history
// *****************************************************


checkUserHistory = function() {
    var donePairwisePaperRecord =
        clcUserHistory.find({
            'workerId': workerId,
            'type': 'pairwise_paper',
            'status': 'completed',
        }).fetch();

    var hyper = clcHyperparameter.findOne();
    return donePairwisePaperRecord.length < hyper["maximum_pairwise_assignment_per_user"];
}




// *****************************************************
// Record user activity
// *****************************************************

recordUserNavigation = function(currPage) {
    if (currPage == null) {
        currPage = getCurrPage();
    }
    clcUserActivity.insert({
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "type": "navigation",
        "note": "finish current page",
        "currPage": currPage,
        "timestamp": new Date().getTime()
    });
}


// *****************************************************
// Record user response
// *****************************************************

getRadioSelectedValue = function(radioName) {
    var selectedRadio = document.querySelector('input[name="' + radioName + '"]:checked')
    if (selectedRadio) { return selectedRadio.value; } else { return null; }
}

getRadioSelectedId = function(radioName) {
    var selectedRadio = document.querySelector('input[name="' + radioName + '"]:checked')
    if (selectedRadio) { return selectedRadio.id; } else { return null; }
}

getHighlightedSentenceByColor = function(highlightColor) {
    var selectedSentenceElementList = document.getElementsByClassName(highlightColor);
    var selectedSentenceList = [];
    for (var i = 0; i < selectedSentenceElementList.length; i++) {
        selectedSentenceList.push(selectedSentenceElementList[i].innerHTML);
    }
    return selectedSentenceList;
}

recordAbstractPageResponse = function() {
    var entry = {
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "currPage": getCurrPage(),
        "section": "abstract",
        "paper_md5_id": glob.currPaperMd5IdList[nonNeg(glob.taskId - 1)],
        "paper_title": glob.currPaperTitleList[nonNeg(glob.taskId - 1)],
        "paper_exp_id": glob.currPaperExpIdList[nonNeg(glob.taskId - 1)],
        "timestamp": new Date().getTime()
    }

    //q1
    entry["abstract_main_claim_sentence"] = getHighlightedSentenceByColor("highlight" + ABSTRACT_HIGHLIGHT_COLOR1);
    //q2
    entry["abstract_unfamilar_term_num"] = getRadioSelectedValue("unfamiliarTerms");
    //q3
    entry["abstract_unfamilar_term_example"] = document.getElementById("unfamiliarTermsUserInput").value;
    //q4
    entry["abstract_main_claim_undertand"] = parseInt(getRadioSelectedValue("mainClaimUnderstand"));
    entry["abstract_main_claim_undertand_note"] = getRadioSelectedId("mainClaimUnderstand");
    //q5
    entry["abstract_main_claim_paraphrase"] = document.getElementById("mainClaimsUserInput").value;
    //q6
    entry["abstract_personal_experience"] = parseInt(getRadioSelectedValue("personalExperience"));
    entry["abstract_personal_experience_note"] = getRadioSelectedId("personalExperience");

    clcMainResponse.insert(entry);
}

recordMethodPageResponse = function() {
    var entry = {
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "currPage": getCurrPage(),
        "section": "method",
        "paper_md5_id": glob.currPaperMd5IdList[nonNeg(glob.taskId - 1)],
        "paper_title": glob.currPaperTitleList[nonNeg(glob.taskId - 1)],
        "paper_exp_id": glob.currPaperExpIdList[nonNeg(glob.taskId - 1)],
        "timestamp": new Date().getTime()
    }

    //q1
    entry['method_overlook_sentence_existence'] = !document.getElementById("begining-paragraph-NOT-exists").checked;
    entry["method_overlook_sentence"] = getHighlightedSentenceByColor("highlight" + METHOD_HIGHLIGHT_COLOR1);
    //q2
    entry["method_main_step_sentence"] = getHighlightedSentenceByColor("highlight" + METHOD_HIGHLIGHT_COLOR2);
    //q3
    entry["method_participant_num"] = parseInt(document.getElementById("participantRecruitCheck").value);
    //q4
    entry["method_replication_prediction"] = document.getElementById("predictionProbability").value;
    //q5
    entry["method_claim_generalization"] = parseInt(getRadioSelectedValue("otherScenarioEstimate"));
    entry["method_claim_generalization_note"] = getRadioSelectedId("otherScenarioEstimate");

    clcMainResponse.insert(entry);
}

recordPairwisePageResponse = function() {
    var entry = {
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "currPage": getCurrPage(),
        "section": "pairwsie_comparison",
        "paper_md5_id_1": glob.currPaperMd5IdList[0],
        "paper_title_1": glob.currPaperTitleList[0],
        "paper_exp_id_1": glob.currPaperExpIdList[0],
        "paper_md5_id_2": glob.currPaperMd5IdList[1],
        "paper_title_2": glob.currPaperTitleList[1],
        "paper_exp_id_2": glob.currPaperExpIdList[1],
        "timestamp": new Date().getTime()
    }

    //q1
    entry["pairwise_replication_comparison"] = parseInt(getRadioSelectedValue("pairwiseReplicateComparison"));
    entry["pairwise_replication_comparison_note"] = getRadioSelectedId("pairwiseReplicateComparison");
    //q2
    entry["pairwise_better_judgement_ability"] = parseInt(getRadioSelectedValue("pairwiseJudgementCapacity"));
    entry["pairwise_better_judgement_ability_note"] = getRadioSelectedId("pairwiseJudgementCapacity");
    //q3
    entry["pairwise_reasoning_paper_choice"] = parseInt(getRadioSelectedValue("pairwiseReasoningPaperChoice"));
    entry["pairwise_reasoning_paper_choice_note"] = getRadioSelectedId("pairwiseReasoningPaperChoice");
    entry["pairwise_selected_paper_reasoning"] = document.getElementById("mainClaimsUserInput").value;

    clcMainResponse.insert(entry);

}

recordExistSurveyResponse = function() {
    var entry = {
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "currPage": getCurrPage(),
        "section": "exit_survey",
        "timestamp": new Date().getTime()
    }

    //q1
    entry["age"] = getRadioSelectedValue("exitSurveyAge");
    //q2
    entry["gender"] = getRadioSelectedValue("exitSurveyGenders");
    //q3
    entry["degree"] = getRadioSelectedValue("exitSurveyDegree");
    //q4
    entry["degree_related_to_social_science"] = parseInt(getRadioSelectedValue("exitSurveySocSciRelated"));
    //q5
    entry["knew_replication_project_before"] = parseInt(getRadioSelectedValue("exitSurveyKnowSSRP"));
    //q6
    entry["knew_paper_assigned_before"] = parseInt(getRadioSelectedValue("knewPaperAssigned"));
    //q7
    entry["experiment_experience"] = parseInt(getRadioSelectedValue("exitSurveyHITExperience"));
    //q8
    entry["experiment_suggestion"] = document.getElementById("exitSurveySuggestion").value;

    clcExitSurvey.insert(entry);
}

// *****************************************************
// User assignment generation and record
// *****************************************************

recordPairwisePaperAssignment = function() {
    var entry = {
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "type": "pairwise_paper",
        "status": "assigned",
        "paper_md5_id_1": glob.currPaperMd5IdList[0],
        "paper_title_1": glob.currPaperTitleList[0],
        "paper_md5_id_2": glob.currPaperMd5IdList[1],
        "paper_title_2": glob.currPaperTitleList[1],
        "timestamp": new Date().getTime()
    }
    //console.log(entry);
    clcUserHistory.insert(entry);
    var entryId = clcPaper.findOne({ "paper_md5_id": glob.currPaperMd5IdList[0] })._id;
    clcPaper.update({ "_id": entryId }, {
        $inc: {
            "paper_assigned": 1,
            "paper_assigned_as_first_exp_paper": 1
        }
    });
    var entryId = clcPaper.findOne({ "paper_md5_id": glob.currPaperMd5IdList[1] })._id;
    clcPaper.update({ "_id": entryId }, {
        $inc: { "paper_assigned": 1 }
    });
}

recordPairwisePaperCompletion = function() {
    clcUserHistory.insert({
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "type": "pairwise_paper",
        "status": "completed",
        "paper_md5_id_1": glob.currPaperMd5IdList[0],
        "paper_title_1": glob.currPaperTitleList[0],
        "paper_md5_id_2": glob.currPaperMd5IdList[1],
        "paper_title_2": glob.currPaperTitleList[1],
        "timestamp": new Date().getTime()
    });
    var entryId = clcPaper.findOne({ "paper_exp_id": glob.currPaperExpIdList[0] })._id;
    clcPaper.update({ "_id": entryId }, {
        $inc: {
            "paper_completed": 1,
            "paper_completed_as_first_exp_paper": 1
        }
    });
    var entryId = clcPaper.findOne({ "paper_exp_id": glob.currPaperExpIdList[1] })._id;
    clcPaper.update({ "_id": entryId }, {
        $inc: { "paper_completed": 1 }
    });
}

recordIndividualPaperCompletion = function() {
    clcUserHistory.insert({
        "workerId": workerId,
        "assignmentId": assignmentId,
        "hitId": hitId,
        "type": "individual_paper",
        "status": "completed",
        "paper_md5_id": glob.currPaperMd5IdList[nonNeg(glob.taskId - 1)],
        "paper_title": glob.currPaperTitleList[nonNeg(glob.taskId - 1)],
        "timestamp": new Date().getTime()
    });
}

randomDrawnFromChanceArray = function(chanceArray) {
    var totalMass = 0;
    var rand = Math.random();
    var cdf = [];
    for (var i = 0; i < chanceArray.length; i++) {
        totalMass += chanceArray[i];
        //alert("totalMass"+totalMass.toString());
        cdf[i] = totalMass;
    }
    if (totalMass <= 0) return -1;
    for (var i = 0; i < chanceArray.length; i++) {
        cdf[i] /= totalMass;
        if (rand <= cdf[i]) {
            // console.log("cdf:");
            // console.log(cdf);
            return i;
        }

    }
    // console.log("cdf:");
    // console.log(cdf);
    return Math.floor(Math.random() * chanceArray.length);
}

sortAByOrderB = (arr1, arr2) => arr1
    .map((item, index) => [arr2[index], item]) // add the args to sort by
    .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
    .map(([, item]) => item) // extract the sorted items
    .reverse();

consolePaperStatus = function(attri) {
    var paperList = clcPaper.find().fetch();
    var numPaper = paperList.length;
    var paperCompleted = [];
    var paperAssigned = [];
    var paperFirstAssigned = [];
    var paperFirstCompleted = [];
    var paperExpId = [];
    var paperMd5Id = [];
    var paperTitle = [];
    var paperMaxCompletion = [];

    for (var i = 0; i < numPaper; i++) {
        paperAssigned.push(parseInt(paperList[i]["paper_assigned"]));
        paperCompleted.push(parseInt(paperList[i]["paper_completed"]));
        paperFirstAssigned.push(parseInt(paperList[i]["paper_assigned_as_first_exp_paper"]));
        paperFirstCompleted.push(parseInt(paperList[i]["paper_completed_as_first_exp_paper"]));
        paperExpId.push(parseInt(paperList[i]["paper_exp_id"]));
        paperMd5Id.push(paperList[i]["paper_md5_id"]);
        paperTitle.push(paperList[i]["paper_title"])
        paperMaxCompletion.push(parseInt(paperList[i]["paper_max_completion"]));
    }

    paperAssigned = sortAByOrderB(paperAssigned, paperExpId);
    paperCompleted = sortAByOrderB(paperCompleted, paperExpId);
    paperFirstAssigned = sortAByOrderB(paperFirstAssigned, paperExpId);
    paperFirstCompleted = sortAByOrderB(paperFirstCompleted, paperExpId);
    paperMaxCompletion = sortAByOrderB(paperMaxCompletion, paperExpId);
    paperMd5Id = sortAByOrderB(paperMd5Id, paperExpId);
    paperTitle = sortAByOrderB(paperTitle, paperExpId);
    paperExpId = sortAByOrderB(paperExpId, paperExpId);

    attri = attri.toLowerCase();
    if (attri.includes("firstassign")) {
        console.log(attri + ": " + paperFirstAssigned.join());
    } else if (attri.includes("firstcomplete")) {
        console.log(attri + ": " + paperFirstCompleted.join());
    } else if (attri.includes("maxcompletion")) {
        console.log(attri + ": " + paperMaxCompletion.join());
    } else if (attri.includes("exp")) {
        console.log(attri + ": " + paperExpId.join());
    } else if (attri.includes("md5")) {
        console.log(attri + ": " + paperMd5Id.join());
    } else if (attri.includes("title")) {
        console.log(attri + ": " + paperTitle.join());
    } else if (attri.includes("assign")) {
        console.log(attri + ": " + paperAssigned.join());
    } else if (attri.includes("complete")) {
        console.log(attri + ": " + paperCompleted.join());
    }
}

paperPairwiseAssignmentAndRecord = function() {
    var paperList = clcPaper.find().fetch();
    var numPaper = paperList.length;
    var paperCompleted = [];
    var paperAssigned = [];
    var paperFirstAssigned = [];
    var paperFirstCompleted = [];
    var paperExpId = [];
    var paperMd5Id = [];
    var paperTitle = [];
    var paperMaxCompletion = [];
    var paperDrawnChance = [];
    const epsilon = 0.01;

    for (var i = 0; i < numPaper; i++) {
        paperAssigned.push(parseInt(paperList[i]["paper_assigned"]));
        paperCompleted.push(parseInt(paperList[i]["paper_completed"]));
        paperFirstAssigned.push(parseInt(paperList[i]["paper_assigned_as_first_exp_paper"]));
        paperFirstCompleted.push(parseInt(paperList[i]["paper_completed_as_first_exp_paper"]));
        paperExpId.push(parseInt(paperList[i]["paper_exp_id"]));
        paperMd5Id.push(paperList[i]["paper_md5_id"]);
        paperTitle.push(paperList[i]["paper_title"])
        paperMaxCompletion.push(parseInt(paperList[i]["paper_max_completion"]));
    }

    var donePaperMd5Dict = {};

    var donePaperRecord =
        clcUserHistory.find({
            'workerId': workerId,
            'type': 'individual_paper',
            'status': 'completed'
        }).fetch();


    for (var i = 0; i < donePaperRecord.length; i++) {
        donePaperMd5Dict[donePaperRecord[i]['paper_md5_id']] = true;
    }

    donePaperRecord =
        clcUserHistory.find({
            'workerId': workerId,
            'type': 'pairwise_paper',
            'status': 'completed'
        }).fetch();
    for (var i = 0; i < donePaperRecord.length; i++) {
        donePaperMd5Dict[donePaperRecord[i]['paper_md5_id_1']] = true;
        donePaperMd5Dict[donePaperRecord[i]['paper_md5_id_2']] = true;
    }

    //console.log(paperExpId);
    //console.log(paperCompleted);

    for (var i = 0; i < numPaper; i++) {
        chance = Math.max(0, paperMaxCompletion[i] - paperCompleted[i]);
        chance = chance + epsilon;

        if (donePaperMd5Dict[paperMd5Id[i]]) { // The user has completed this paper before. 
            //alert([i, paperExpId[i], paperMd5Id[i]].join());
            chance = 0;
        }

        paperDrawnChance.push(chance);
    }
    var i1, i2;
    i1 = randomDrawnFromChanceArray(paperDrawnChance);
    if (i1 < 0) return false;
    paperDrawnChance[i1] = 0;
    i2 = randomDrawnFromChanceArray(paperDrawnChance);
    if (i2 < 0) return false;

    var first_need_ratio1 = Math.max(0.001 * epsilon, paperMaxCompletion[i1] / 2 - paperFirstCompleted[i1]);
    first_need_ratio1 /= Math.max(epsilon, paperMaxCompletion[i1] - paperCompleted[i1]);
    console.log("ratio of " + paperExpId[i1].toString() + ": " +
        (Math.max(0.001 * epsilon, paperMaxCompletion[i1] / 2 - paperFirstCompleted[i1])).toString() +
        '/' +
        (Math.max(epsilon, paperMaxCompletion[i1] - paperCompleted[i1])).toString()
    );

    var first_need_ratio2 = Math.max(0.001 * epsilon, paperMaxCompletion[i2] / 2 - paperFirstCompleted[i2]);
    first_need_ratio2 /= Math.max(epsilon, paperMaxCompletion[i2] - paperCompleted[i2]);
    console.log("ratio of " + paperExpId[i2].toString() + ": " +
        (Math.max(0.001 * epsilon, paperMaxCompletion[i2] / 2 - paperFirstCompleted[i2])).toString() +
        '/' +
        (Math.max(epsilon, paperMaxCompletion[i2] - paperCompleted[i2])).toString()
    );

    if (first_need_ratio1 < first_need_ratio2) {
        [i1, i2] = [i2, i1];
    }

    glob.currPaperExpIdList = [paperExpId[i1], paperExpId[i2]];
    glob.currPaperMd5IdList = [paperMd5Id[i1], paperMd5Id[i2]];
    glob.currPaperTitleList = [paperTitle[i1], paperTitle[i2]];
    glob.taskId = 0;

    recordPairwisePaperAssignment();


    consolePaperStatus("completed");
    consolePaperStatus("firstcomplete");
    // For debug and test
    // glob.taskId = 1;
    // recordIndividualPaperCompletion();
    // glob.taskId = 2;
    // recordIndividualPaperCompletion();
    // recordPairwisePaperCompletion();
    // consolePaperStatus("completed");
    // consolePaperStatus("firstcomplete");

    return true;
}