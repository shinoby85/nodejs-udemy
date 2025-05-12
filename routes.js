const fs = require('fs');

const allUsers = [
  'Alex May',
  'Bread Pit',
  'Richard Gershwin'
]

const requestHandler = (req, res) => {
  const {url, method, headers} = req;
  res.write('<html>');
  if (url === '/') {
    res.write('<head><title>My practice main page</title></head>');
    res.write('<body><h1>Hello to my main page!</h1><p>You can see all <a href="/users">users</a></p>');
    res.write(`<form action="/create-user" method="post" xmlns="http://www.w3.org/1999/html">
      <input type="text" name="userName">
      </br>
      <button type="submit" style="margin-top: 10px;">Add new user</button>
    </form>`);
    res.write('</body>');
  }
  if (url === '/users'){
    res.write('<head><title>Users page</title></head>');
    res.write('<body><ul>');
    allUsers.forEach(user => {
      res.write(`<li>${user}</li>`);
    })
    res.write('</ul></body>');
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1].replaceAll(/\+/g, ' ');
      allUsers.push(userName);
      res.statusCode = 302;
      res.write('<head><title>Create user page</title></head>');
      res.write('<body><h1>User was created!</h1><p>You can see all <a href="/users">users</a></p></body>');
      console.log('Add user: ', userName);
    })
  }
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;
