let adminUsername=sessionStorage.getItem("adminUsername");
console.log(adminUsername)
if(adminUsername==null){
  window.location.replace(window.location.origin+"/pages/samples/login.html")
    
}else{
    let usernameContainer=document.querySelectorAll('.adminUsername');
    

        usernameContainer[0].innerText=adminUsername;
        usernameContainer[1].innerText=adminUsername;
}


