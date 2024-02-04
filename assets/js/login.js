let emailInp = document.querySelector('#emailInp')
let passInp = document.querySelector('#passInp')
let form =document.querySelector('#form')

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    let emailInp = document.querySelector("#emailInp").value;
    let passInp = document.querySelector("#passInp").value;
    // let nameInp = document.querySelector("#nameInp").value;

    fetch('http://localhost:3000/users', {
      }).then(res=>res.json())
      .then(data => {
        console.log(data);

        let currentUserInfo = data.find((user)=>user.email == emailInp)
        if(currentUserInfo){
            if(currentUserInfo.password == passInp){
                localStorage.setItem('currentUser', JSON.stringify(currentUserInfo));
                window.location = './admin.html'
            }else{
                console.log('Wrong password');
            }      
        }else{
            console.log("Wrong email");
        }
      })
})