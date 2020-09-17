import { EJSON } from 'meteor/ejson'


const elements = document.querySelectorAll('.sentence');
        Array.from(elements).forEach((element, index) => {
          element.addEventListener("click", function( event ) {
            
            if(document.getElementById("selectedSentence")!=null){
              document.getElementById("selectedSentence").id="";
            }
            document.getElementById("highlightBox").style.top = event.pageY + "px";
            document.getElementById("highlightBox").style.left =event.pageX + "px";
            element.id="selectedSentence";
            document.getElementById("highlightBox").style.display = "block";
          }, false);

          element.addEventListener("mouseover", function( event ) {
            
            if(document.getElementById("hoverSentence")!=null){
              document.getElementById("hoverSentence").id="";
            }
            element.id="hoverSentence";
          }, false);

      });

      function highlight(){
        if(document.getElementById("selectedSentence").className.includes("highlightedSentence")){
          document.getElementById("selectedSentence").className="sentence";
          document.getElementById("highlightBox").style.display = "none";
          document.getElementById("selectedSentence").id="";
        }else{
          document.getElementById("selectedSentence").className="highlightedSentence sentence";
          document.getElementById("highlightBox").style.display = "none";
          document.getElementById("selectedSentence").id="";
        }
        
      }

      function highlightClosePopup(){
        document.getElementById("highlightBox").style.display = "none";
        document.getElementById("selectedSentence").id="";
      }