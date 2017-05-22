/**
 * Created by Zero on 2017/5/2 0002.
 */

function saveSessionStorage(id) {
    var element = document.getElementById(id);
    var value = element.value;
    sessionStorage.setItem("message", element.value);
}
function saveLocationStorage(id) {
    var element = document.getElementById(id);
    localStorage.setItem("message", element.value);
}
function loadSessionStorage(id) {
    var element = document.getElementById(id);
    var item = sessionStorage.getItem("message");
    element.innerHTML = item;
}
function loadLocationStorage(id) {
    var element = document.getElementById(id);
    var item = localStorage.getItem("message");
    element.innerHTML = item;
}
function saveJsonData() {
    var data = new Object;
   data.name= document.getElementById("name").value;
   data.email = document.getElementById("email").value;
   data.phone = document.getElementById("phone").value;
   data.note = document.getElementById("note").value;
   var stringify = JSON.stringify(data);
    sessionStorage.setItem(data.name, stringify);
    alert("数据已经保存")
}
function loadJsonData(id) {
    var value=document.getElementById(id).value;
   var json=sessionStorage.getItem(value);
    var data=JSON.parse(json);
    var reslut = "姓名:" + data.name + "<br>";
    reslut += "Email:" + data.email + "<br>";
    reslut += "电话号码:" + data.phone + "<br>";
    reslut += "备注:" + data.note + "<br>";
    document.getElementById("result").innerHTML = reslut;
}