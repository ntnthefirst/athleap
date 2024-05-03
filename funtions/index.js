window.addEventListener('DOMContentLoaded', function() {
    redirect()
});

function redirect() {
    var Aelement = document.createElement("a")
    Aelement.href = "pages/hub.html"
    Aelement.click()
}