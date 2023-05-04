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
      .post("https://crudcrud.com/api/c52027019de84fd1b2d5edab5a31e8b9/appointmentData",myobj)
      .then(response=>{
        showUser(response.data);
      })
      .catch(err=>console.log(err));
}

window.addEventListener("DOMContentLoaded",()=>{
    axios
        .get("https://crudcrud.com/api/c52027019de84fd1b2d5edab5a31e8b9/appointmentData")
        .then((response)=>{
            for(var i=0;i<response.data.length;i++)
              showUser(response.data[i]);
        })
        .catch((error)=>console.log(error));
})

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
      const dId=myobj._id;
        axios
          .delete(`https://crudcrud.com/api/c52027019de84fd1b2d5edab5a31e8b9/appointmentData/${dId}`)
          .then(()=>{
                parentElem.removeChild(childElem);
          })
          .catch((err)=>console.log(err));
         
    });
    editbtn.addEventListener('click',function(){
      parentElem.removeChild(childElem);
      document.getElementById('name').value=myobj.name;
      document.getElementById('email').value=myobj.email;
      const dId=myobj._id;
      axios
      .delete(`https://crudcrud.com/api/c52027019de84fd1b2d5edab5a31e8b9/appointmentData/${dId}`)
      .then(()=>{
            parentElem.removeChild(childElem);
      })
      .catch((err)=>console.log(err));
    })
}