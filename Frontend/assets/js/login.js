function validate(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

    if(username=="admin" && password=="pukulenam")
    {
        alert("login successfully");
        
        return false;
    }
    else
    {
        alert("login failed");
    }
}