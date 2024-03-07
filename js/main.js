
// I did not have any feedback for my Javascript, so I did not modify it, only added. 
function hideMenu(){
    var x = document.getElementById("hidden");
    if(window.innerWidth <= 960){
        x.style.marginLeft = "10px";

        if(x.style.marginTop === "-700px"){
            x.style.marginTop = "10px";
        }
        else{
            x.style.marginTop = "-700px";
        }
    }
    else{
        x.style.marginTop = "10px";
    if(x.style.marginLeft === "-300px"){
        x.style.marginLeft = "10px"
    }
    else{
        x.style.marginLeft="-300px"

    }}
}

document.getElementById("visitLog").addEventListener("click", function(){
    document.getElementById("myForm").classList.add("not-hidden");
    document.getElementById("myForm").classList.remove("hidden");
})
document.addEventListener("DOMContentLoaded", function(event){
    initValidation();
});

document.getElementById("themeChange"). addEventListener("click", function(){
    toggleStylesheet("css/theme.css");
})
function toggleStylesheet(href, onoff){
    var existingNode = 0;
    for(let i = 0; i<document.styleSheets.length; i++){
        if(document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode = document.styleSheets[i].ownerNode;
    }
        if(onoff == undefined) onoff = !existingNode;
        if(onoff){
            if(existingNode) return onoff;
            var link = document.createElement('link');
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = href;
            document.getElementsByTagName('head')[0].appendChild(link);
            document.getElementById("header-logo").src = "media/sazzylogoblue.png";
        }
        else{
            if(existingNode) existingNode.parentNode.removeChild(existingNode);
            document.getElementById("header-logo").src = "media/sazzylogodarkred.png";

        }
        return onoff;
}
var accordions = document.getElementsByClassName("center-content-body-headers")
var i;
for(i = 0; i < accordions.length; i++){
    accordions[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var accordionContent = this.nextElementSibling;
        if(accordionContent.style.maxHeight === "2000px"){
            accordionContent.style.maxHeight = "0";

            // accordionContent.style.display = "none";
            this.classList.remove("minus-sign"); 
            this.classList.add("plus-sign");           

        } else{
            // accordionContent.style.display = "grid";
            this.classList.add("minus-sign");
            this.classList.remove("plus-sign");           

            accordionContent.style.maxHeight = "2000px";

        }
    });
}
