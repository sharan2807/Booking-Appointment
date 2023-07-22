function saveToLocalStorage(event){
    event.preventDefault();

    //To retrieve data similar to document.getElementById
    const Name=event.target.username.value;
    const Email=event.target.email.value;
    const Phone=event.target.phone.value;

    //To store details in local storage
    // localStorage.setItem('NAME',Name);
    // localStorage.setItem('EMAIL',Email);
    // localStorage.setItem('PHONE',Phone);

    //to store everything in an object but local storage takes only strings as key & value
    const Obj={
        NAME:Name,
        EMAIL:Email,
        PHONE:Phone
    }

    //to send data from frontend to backend
    axios.post("https://crudcrud.com/api/9c94d941017d49ecb75283de2c065790/appointmentData",Obj)
    .then((response)=>{
        showUserOnScreen(response.data)
        //console.log(response)       // not required on console
    })
    .catch((err)=>{
        console.log(err)
    })

    //to store the object in the local storage
    // localStorage.setItem(Obj.EMAIL,JSON.stringify(Obj))
    // showUserOnScreen(Obj);
}
//------------X TRIAL TO GET DATA FROM LOCAL STORAGE ON PAGE REFRESH X----------------
// window.addEventListener("DOMContentLoaded",()=>{
//     const localStorageObj=localStorage;
//     const localStorageKeys= Object.keys(localStorageObj)

//     for(var i=0;i<localStorageKeys.length;i++){
//         const key =localStorageKeys[i]
//         const userDetailsString=localStorageObj[key];
//         const userDetailsObj=JSON.parse(userDetailsString);
//         showNewUserOnScreen(userDetailsObj)
//     }
// })
//------------X TRIAL TO GET DATA FROM LOCAL STORAGE ON PAGE REFRESH X----------------

function showUserOnScreen(Obj){
    let parent=document.getElementById("listOfItems") //ul tag
    let child=document.createElement('li') //creating a new list element
    child.textContent=Obj.NAME +' - '+ Obj.EMAIL +' - '+ Obj.PHONE +'  '  //taking values from Object 'Obj' to show on screen

    const deleteButton= document.createElement('input')
    deleteButton.type="button"
    deleteButton.value="DELETE"
    deleteButton.onclick=()=>{
        localStorage.removeItem(Obj.EMAIL) //removing the entire object from local storage
        parent.removeChild(child)  // removing that particular li element fron the screen
    }
    const editButton=document.createElement('input')
    editButton.type='button'
    editButton.value='EDIT'
    editButton.onclick=()=>{
        localStorage.removeItem(Obj.EMAIL)  //same as delete button 
        parent.removeChild(child)   //same as delete button 
        document.getElementById('NameInputTag').value=Obj.NAME //populating the name into the input box
        document.getElementById('EmailInputTag').value=Obj.EMAIL
        document.getElementById('PhoneInputTag').value=Obj.PHONE
    }


    child.appendChild(editButton);
    child.appendChild(deleteButton);
    parent.appendChild(child);
}