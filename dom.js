let forms=document.getElementById('my-form');
forms.addEventListener('submit',addData);


function addData(e)
{
    e.preventDefault();
    let nameInput=document.getElementById('name').value;
    let emailInput=document.getElementById('email').value;
    let myobj={
        name:nameInput,
        email:emailInput
    } 
    axios
      .post("https://crudcrud.com/api/31f3a3418bb54b16a711bbab1399b96b/appointmentData",myobj)
      .then(response=>{
        showUser(response.data);
      })
      .catch(err=>console.log(err));
}
function showUser(myobj)
{
    var parentElem=document.getElementById('users');
    const childElem=document.createElement('li');
    childElem.textContent=myobj.name+'-'+myobj.email+" "; 
    const deletebtn=document.createElement('button');
    deletebtn.textContent='Delete';

    const editbtn=document.createElement('button');
    editbtn.textContent='Edit';
    childElem.appendChild(deletebtn);
    childElem.appendChild(editbtn);
    parentElem.appendChild(childElem);

    deletebtn.addEventListener('click',function(){
         parentElem.removeChild(childElem); 
    });
    editbtn.addEventListener('click',function(){
         parentElem.removeChild(childElem); 
         document.getElementById('name').value=myobj.name;
         document.getElementById('email').value=myobj.email;
    });
}