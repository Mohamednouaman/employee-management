let btnLogout=document.getElementById("logout");


btnLogout.addEventListener("click",function(){
    sessionStorage.clear();
    window.location.replace(window.location.origin+"/pages/samples/login.html")

    });
