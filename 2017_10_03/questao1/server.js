var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var users = [];

http.createServer(function (req, res) {
    fs.readFile('data.json', (err, data) => {  
        if (err) throw err;
        var jsonData = JSON.parse(data);
        users = [];
        for (var i = 0; i < jsonData.length; i++) {
            users.push(jsonData[i]);
        }
        loadUrl(req,res);
    });
}).listen(3000);

function loadUrl(req,res) {
    var q = url.parse(req.url, true);
    var page = "." + q.pathname;
    var id = -1;
    var confirm = false;
    var img = null;

    if (page=="./") {
        showPage(res);
    } 
    else if (page.includes("new")) {
        confirm = q.query.add;
        if (confirm=="true") {
            saveUser(req, res, id);
        }
        else {
            newPage(res);
        }
    }
    else if (page.includes("edit")) {
        id = q.query.id;
        confirm = q.query.update;
        if (confirm=="true") {
            saveUser(req, res, id);
        }
        else {
            editPage(res, id);
        }
    }
    else if (page.includes("delete")) {
        id = q.query.id;
        confirm = q.query.delete;
        if (confirm=="true") {
            deleteUser(res, id);
        }
        else {
            deletePage(res, id);
        }
    }
    else if (page.includes("show-user")) {
        id = q.query.id;
        showPage(res, id);
    }
    else if (page.includes("img")) {
        if (page.includes(".jpg")) {
            img = fs.readFileSync(page);
            res.writeHead(200, {'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
        }
        else if (page.includes(".png")) {
            img = fs.readFileSync(page);
            res.writeHead(200, {'Content-Type': 'image/png' });
            res.end(img, 'binary');
        }
        else { 
            res.writeHead(404, {'Content-Type': 'text/html' });
            res.end("<h2 style='font-family:Lucida Grande;'>404 Not Found</h2>");
        }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html' });
        res.end("<h2 style='font-family:Lucida Grande;'>404 Not Found</h2>");
    }
}

function saveData() {
    var data = JSON.stringify(users, null, 2);
    fs.writeFile('data.json', data, (err) => {  
        if (err) throw err;
    });
}

function showPage(res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<div style='font-family:Lucida Grande; padding: 50px;'>");
    res.write("<h1>Users CRUD 1 <span style='font-size:14px'> by Erick Santos</span></h1><hr style='margin-top:-15px; margin-bottom:20px;'>");
    res.write("<span style='margin-top: -55px; float:right;'><a style='text-decoration:none;' href='/new'>&#10010; Add user</a></span>");
    
    if (users.length>0) {
        for (var i=0; i<users.length; i++) {
            showUser(res, i);
        }
    }
    else {
        res.write("No users found.");
    }
    res.write("</div>");
    return res.end();
}

function showUser(res, id) {
    var user = users[id];
    if (user.photo=="") {
        user.photo = "./img/default-user-image.png";
    }
    res.write("<div style='height:110px; padding:10px; margin:5px; background-color: #f5f5f5;'>");
    res.write("<div><img style='border-radius:50%; float:left; margin-right:10px;' width='100px' height='100px'src='"+ user.photo +"'/></div>");
    res.write("<h3 style='margin-top:5px; display: inline-block;'>" + user.name + "</h3>");
    res.write("&nbsp;&nbsp;&nbsp;<a style='text-decoration:none;' href='/edit?id=" + id + "'>&#9998; Edit</a>&nbsp;&nbsp;&nbsp;<a style='text-decoration:none;' href='/delete?id=" + id + "'>&#10006; Delete</a>");
    res.write("<div>E-mail: " + user.email + "</div>");
    res.write("<div>Address: " + user.address + "</div>");
    res.write("<div>Phone number: " + user.phone + "</div>");
    res.write("</div>");
}

function newPage(res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<div style='font-family:Lucida Grande; padding: 50px;'>");
    res.write("<h1>New user | Users CRUD 1</h1><hr style='margin-top:-15px; margin-bottom:20px;'>");
    res.write("<span style='margin-top: -45px; float:right;'><a style='text-decoration:none;' href='/'>&#10095; Show users</a></span>");

    res.write("<form action='?add=true' method='post' enctype='multipart/form-data'>");
    res.write("<label for='name'>Name:</label><input type='text' id='name' name='name' placeholder='Enter your full name' required /><br />");
    res.write("<label for='photo'>Photo:</label><input type='file' id='photo' name='photo' /><br />");
    res.write("<label for='email'>E-mail:</label><input type='email' id='email' name='email' placeholder='Enter your email address' /><br />");
    res.write("<label for='address'>Address:</label><input type='text' id='address' name='address' placeholder='Enter your full address' /><br />");
    res.write("<label for='phone'>Phone number:</label><input type='text' id='phone' name='phone' placeholder='Enter your phone number' /><br />");
    res.write("<input type='submit' value='Save' /></form>");
    
    res.write("</div>");
    return res.end();
}

function editPage(res, id) {
    var user = users[id];
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<div style='font-family:Lucida Grande; padding: 50px;'>");
    res.write("<h1>Edit user | Users CRUD 1</h1><hr style='margin-top:-15px; margin-bottom:20px;'>");
    res.write("<span style='margin-top: -45px; float:right;'><a style='text-decoration:none;' href='/'>&#10095; Show users</a></span>");

    res.write("<form action='?id="+ id +"&update=true' method='post' enctype='multipart/form-data'>");
    res.write("<label for='name'>Name:</label><input type='text' id='name' name='name' placeholder='Enter your full name' value='"+ user.name +"' required/><br />");
    res.write("<label for='photo'>Photo:</label><input type='file' id='photo' name='photo' value='"+ user.photo +"'/><br />");
    res.write("<label for='email'>E-mail:</label><input type='email' id='email' name='email' placeholder='Enter your email address' value='"+ user.email +"'/><br />");
    res.write("<label for='address'>Address:</label><input type='text' id='address' name='address' placeholder='Enter your full address' value='"+ user.address +"'/><br />");
    res.write("<label for='phone'>Phone number:</label><input type='text' id='phone' name='phone' placeholder='Enter your phone number' value='"+ user.phone+"'/><br />");
    res.write("<input type='submit' value='Save' /></form>");
    
    res.write("</div>");
    return res.end();
}

function deletePage(res, id) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<script>");
    res.write("if (window.confirm('Are you sure that you want to delete this user?')) {");
    res.write("window.location.href += '&delete=true';");
    res.write("} else {");
    res.write("window.location.href = '/';");
    res.write("}");
    res.write("</script>");
    return res.end();
}

function saveUser(req, res, id) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.photo.path;
        var newpath = "./img/" + files.photo.name;
        if (files.photo.name=="") {
            if (id>=0) {
                newpath = users[id].photo;
            }
            else {
                newpath = "";
            }
            saveUserObject(res, id, fields, newpath);
        }
        else {
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                saveUserObject(res, id, fields, newpath);
            });
        }
        
    });
}

function saveUserObject(res, id, fields, newpath) {
    var newUser = { 
        name: fields.name,
        photo: newpath,
        email: fields.email,
        address: fields.address,
        phone: fields.phone 
    };
    if (id<0) {
        users.push(newUser);
    }
    else {
        users.splice(id, 1, newUser);
    }
    saveData();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<script>");
    res.write("window.location.href = '/';");
    res.write("</script>");
    return res.end();
}

function deleteUser(res, id) {
    users.splice(id, 1);
    saveData();
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<script>");
    res.write("window.location.href = '/';");
    res.write("</script>");
    return res.end();
}
