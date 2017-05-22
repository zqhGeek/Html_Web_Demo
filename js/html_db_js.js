/**
 *
 * Created by zqh on 2017/5/2.
 */
var datatable = null;
var db = openDatabase("mysql", "1.0", "test", 1024 * 100);
function initDB() {
    datatable = document.getElementById("datatable");
    showAllData();
}
function removeAllData() {
    for (var i = datatable.childNodes.length - 1; i >= 0; i--) {
        datatable.removeChild(datatable.childNodes[i]);
    }
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    th1.innerHTML = "姓名";
    th2.innerHTML = "留言";
    th3.innerHTML = "时间";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
}

function showData(data) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td1.innerHTML = data.name;
    td2.innerHTML = data.note;
    var t = new Date();
    t.setTime(data.time);
    td3.innerHTML = t.toLocaleDateString() + "" + t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
}
function showAllData() {
    db.transaction(function (callback) {
        callback.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,note TEXT,time INTEGER)", []);
        callback.executeSql("SELECT * FROM MsgData", [], function (tx, rs) {
            removeAllData();
            for (var i = 0; i < rs.rows.length; i++) {
                showData(rs.rows.item(i));
            }
        })
    })
}
function addData(name, note, time) {
    db.transaction(function (callback) {
        callback.executeSql("INSERT INTO MsgData VALUES (?,?,?)", [name, note, time], function () {
            alert("成功")
        }, function (tx, error) {
            alert(error.source + "::" + error.message);
        })
    })
}

function saveData() {
    var name = document.getElementById("name").value;
    var note = document.getElementById("note").value;
    var time = new Date().getTime();
    addData(name, note, time);
    showAllData();
}