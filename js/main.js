var siteName=document.getElementById('siteName');
var siteLink=document.getElementById('siteLink');
var addBtn=document.getElementById('addBtn');
var links=[]
var selection=''
if(localStorage.getItem('links')!=null){
    links=JSON.parse(localStorage.getItem('links'));
    showURL();
}
var ig=0
for(var i=0;i<links.length;i++){
    ig=i
}
addBtn.addEventListener('click',function(){
    var linkDetails={
        name:siteName.value,
        URL:siteLink.value
    }
    
if(links.length==0){
    if(checkName(siteName.value)){
        if(checkURL(siteLink.value)){
        links.push(linkDetails)
        localStorage.setItem('links',JSON.stringify(links))
        showURL()
        clearInputs()
        document.getElementById('repeated').style.display="none"
        document.getElementById('wrongName').style.display="none"
        document.getElementById('wrongURL').style.display="none"
        }else{
            document.getElementById('wrongURL').style.display="block"
            document.getElementById('repeated').style.display="none"
        }
    }
    else{
        document.getElementById('wrongName').style.display="block"
        document.getElementById('repeated').style.display="none"
    }
}else{
if(links.some(typo=>typo.name===linkDetails.name)){
    document.getElementById('repeated').style.display="block"
    document.getElementById('wrongName').style.display="none"    
}
else{
    if(checkName(siteName.value)){
        if(checkURL(siteLink.value)){
        links.push(linkDetails)
        localStorage.setItem('links',JSON.stringify(links))
        showURL()
        clearInputs()
        document.getElementById('repeated').style.display="none"
        document.getElementById('wrongName').style.display="none"
        document.getElementById('wrongURL').style.display="none"
        }else{
            document.getElementById('wrongURL').style.display="block"
            document.getElementById('repeated').style.display="none"
            document.getElementById('wrongName').style.display="none"
        }
    }
    else{
        document.getElementById('wrongName').style.display="block"
        document.getElementById('repeated').style.display="none"
    }            
    
}
    }
})
function showURL(){
    var link=''
    for(var i=0;i<links.length;i++){
        link+=`
        <tr>
                <td>${i+1}</td>
                <td>${links[i].name}</td>
                <td><a href="${links[i].URL}" class="text-reset text-decoration-none"><button class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button class="btn btn-danger" onclick="deleteLink(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `
    }
    document.getElementById('showURL').innerHTML=link;
}
function deleteLink(selected){
    selection=selected
    links.splice(selected,1)
    localStorage.setItem('links',JSON.stringify(links));
    showURL()
}
function clearInputs(){
    siteName.value="";
    siteLink.value=""
}
function checkName(input){
    var regex=/^[A-Z a-z 0-9]{2,}$/
    return regex.test(input)
}
function checkURL(input){
    var regex=/^(https:\/\/)?(www\.)?[-A-Za-z0-9@:._\+]{1,256}\.[a-zA-Z0-9]{1,6}(\/)?([-A-Za-z0-9?@#%:&\/\/])*$/
    return regex.test(input)
}