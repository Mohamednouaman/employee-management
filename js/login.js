let form=document.getElementById("form");
let email=document.getElementById("email");
let password=document.getElementById("password");
let errorContainer=document.getElementById("error-message");
let btn=document.getElementById("btn")
let dataForm=[]
form.addEventListener('submit',function(e){

dataForm=[email.value,password.value]

e.preventDefault();

if(validateData(dataForm)){

  errorContainer.style.display="block";
  errorContainer.innerText="All fields are required";
  errorContainer.classList.add("alert");
  errorContainer.classList.add("alert-danger");
}else{
  errorContainer.style.display="none";
  btn.disabled=true;
  let url="https://mapphelper.herokuapp.com/api/helper/users/"+dataForm[0];
  loadDataFromServer(url)
}

})



let loadDataFromServer= async(url)=>{


    
    try {
         let response = await fetch(url)
         
         if (response.status === 200) {
          let data   =   await response.json()
             let userEmail=data.email;
             let userPassword=data.password;
             if(accountVerify(userPassword,userEmail)){
               if(data.admin===true){
               sessionStorage.setItem("adminUsername",data.firstName+" "+data.lastName);
               sessionStorage.setItem("admin",JSON.stringify(data));
               location.replace(window.location.origin+"/index.html")
              }else{
                btn.disabled=false;
                errorContainer.style.display="block";
                errorContainer.innerText="You don't have access right";
                errorContainer.classList.add("alert");
                errorContainer.classList.add("alert-danger");
            }
             }else{
                btn.disabled=false;
                errorContainer.style.display="block";
                errorContainer.innerText="Incorrect Password";
                errorContainer.classList.add("alert");
                errorContainer.classList.add("alert-danger");
             }
         } else if(response.status === 400){
          btn.disabled=false;
          errorContainer.style.display="block";
          errorContainer.innerText="This account does't exist";
          errorContainer.classList.add("alert");
          errorContainer.classList.add("alert-danger");
         } else{
 
            window.location.replace(window.location.origin+"/pages/samples/error-404.html");
            
         }
 
        } catch (e) {
 
           window.location.replace(window.location.origin+"/pages/samples/error-500.html");
 
          
       } 
 
 
 }

 function accountVerify(password,email){
  return password==dataForm[1] && email==dataForm[0];
}

function validateData(data) {
    let bool=false;
     data.forEach((element) => {
     
         if(element.trim().length==0){
             bool=true
         }
         
     })
 
      return bool
  
 }