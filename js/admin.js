let adminUsername=sessionStorage.getItem("adminUsername");
console.log(adminUsername)
if(adminUsername==null){
  window.location.replace(window.location.origin+"/pages/samples/login.html")
    
}else{
    let usernameContainer=document.querySelectorAll('.adminUsername');
    

        usernameContainer[0].innerText=adminUsername;
        usernameContainer[1].innerText=adminUsername;
}




let createSimpleHTMLElement=(elementName)=>document.createElement(elementName);
let tableContainer=document.getElementById("table-container");
let clientNumber=document.getElementById("number-employees");


let result = "Chargement des données est en cours ...";

tableContainer.innerText=result;

let getEmployees = async (url) => {

    try {
       let response = await fetch(url);
    
          console.log(response);
       if (response.status === 200) {
          let data = await response.json();
          clientNumber.innerHTML ="il ya <code style=\"font-weight:bold\">"+data.length+"</code> employé(s)";
       
             result = ''
             let dataContainer = createEmployeeTable()
             let tbody = createSimpleHTMLElement('tbody');
             data.forEach(element => {
                let tr = createSimpleHTMLElement('tr');
 
 
                for (let property in element) {
                   let td = createSimpleHTMLElement('td');
                   if(property=='id'){
                    let iputHidden=createSimpleHTMLElement("td");
                        iputHidden.style="display:none";
                        iputHidden.innerText=element[property];
                        tr.appendChild(iputHidden);
                   }
                   if(property==='email' || property==='lastName' || property==='firstName'){                   
                   
                   td.innerHTML = element[property];
                   tr.appendChild(td);
                   }
                   if(property==='state'){
                    let state=element['state'];
                    let td=createSimpleHTMLElement('td');
                    if(state){
                        
                        td.innerHTML='<label class="badge badge-success" style="padding:8px 10px;">Approved</label>';
                        tr.appendChild(td);
                    }else{
                       
                        td.innerHTML='<label class="badge badge-warning" style="cursor:pointer;padding:8px; 10px;color:white" class="gg-approve" onclick="approveEmployee(this)">Pending...</label>';
                        tr.appendChild(td);
                    }

                   }
                   if(property==="admin"){
                     let isAdmin=element['admin'];
                     let td=createSimpleHTMLElement('td');
                     if(!isAdmin){
                        
                     td.innerHTML='<img data-toggle="tooltip" data-placement="top" title="supprimer" src="../../images/block.png" style="width:30px;height:30px;cursor:pointer" class="gg-remove" onclick="removeEmployee(this)">';
                     tr.appendChild(td);

                   }else{
                     td.style="background-color:rgb(221, 218, 218);color:grey;text-align:center";
                     td.innerText="Admin";
                     tr.appendChild(td);
                   }
                   }
                }
                
                tbody.appendChild(tr);
 
             });
             tableContainer.innerHTML = result;
             dataContainer.appendChild(tbody);
             tableContainer.appendChild(dataContainer);
          } else if(response.status==400) {
             result = 'Aucun employee trouvé !'
             tableContainer.innerHTML = result;
             tableContainer.classList.add('alert');
             tableContainer.classList.add('alert-danger')
             tableContainer.style="text-align:center"
          
       } else {
          
         window.location.replace(window.location.origin+"/pages/samples/error-404.html");
       }
    } catch (error) {
     
      window.location.replace(window.location.origin+"/pages/samples/error-500.html");
 
      
    }
 
 }




 function createEmployeeTable() {

    let table = createSimpleHTMLElement('table');
    table.classList.add('table');
    table.classList.add('table-hover');
    
    
 
    let lastNameCell = createSimpleHTMLElement("th");    
    let firstNameCell = createSimpleHTMLElement("th");
    let emailCell = createSimpleHTMLElement("th");
    let stateCell=createSimpleHTMLElement("th");
    let actionsCell = createSimpleHTMLElement('th');

    lastNameCell.innerText = "Nom";
    firstNameCell.innerText = "Prénom"
    emailCell.innerText = "Email";
    stateCell.innerText="Etat"
    actionsCell.innerText = "Actions";

    let tr = createSimpleHTMLElement("tr");
    tr.appendChild(firstNameCell);
    tr.appendChild(lastNameCell);
    tr.appendChild(emailCell);
    tr.appendChild(stateCell);
    tr.appendChild(actionsCell);

    let thead = createSimpleHTMLElement('thead');
    thead.appendChild(tr);

    table.appendChild(thead);
    return table;
 
 }
 

getEmployees("http://localhost:8080/api/helper/users/loadAll");

 async function approveEmployee(r){
    r.disabled=true;
    r.innerText="In progress...";
    let employeeId = r.parentNode.parentNode.firstChild.innerText;
     let url="http://localhost:8080/api/helper/approveEmployee/"+employeeId
      let response=await fetch(url);
     if(response.ok==true){

        r.parentNode.innerHTML='<label class="badge badge-success" style="padding:8px 10px;">Approved</label>';
        
      }else{
        alert("Something wrong");
     } 
 }
 async function removeEmployee(r){
    let employeeId = r.parentNode.parentNode.firstChild.innerText;
    let rowIndex= r.parentNode.parentNode.rowIndex
    let url="http://localhost:8080/api/helper/removeUser/"+employeeId
    document.getElementsByTagName("table")[0].deleteRow(rowIndex);
     let response=await fetch(url);
    if(response.ok==true){
       alert("L'employé a été supprimé avec success");
      }else{
       alert("Something wrong");
    } 
 }






































