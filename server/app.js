const express = require('express')
const app = express()
var sqlite3 = require('sqlite3').verbose();
// connecting to database
var db = new sqlite3.Database('./db/mydb.db', (err) => {
    if (err) {
        console.log('err', err)
    }
    console.log('connected')
});
// listening to port 3000
app.listen(3000);

// authenticates the credentials by verifying with database(users table)
app.post('/po', (req, res) => {
    var pass = ''
    db.all('SELECT password FROM users WHERE uname="' + req.query.uname + '"', function(err, row) {
        if (err) {
            console.log(err)
        }
        if (row.length != 0) {
            pass = row[0].password
            if (pass == req.query.password) {
                res.send('yes')
            } else {
                res.send('no')
            }
        } else {
            res.send('no')
        }
    })
})

// sends all the posts from the content table of the db
app.get('/content', (req, res) => {
    db.all('SELECT post from content', function(err, row) {
        res.send(row)
    })
})

// adds a new post to the content table in the database
app.post('/content', (req, res) => {
    db.all('INSERT INTO content values("' + req.query.post + '")', function(err, row) {
        res.send('posted')
    })
})

// deletes a particular row from the content table of th db
app.delete('/content', (req, res) => {
    db.all('DELETE FROM content WHERE post="' + req.query.post + '"', function(err, row) {
        res.send('post deleted')
    })
})

// updated a particular row from the content table of the db
app.put('/content', (req, res) => {
    db.all('UPDATE content SET post="' + req.query.edited + '" WHERE post="' + req.query.post + '"', function(err, row) {
        res.send('post updated')
    })
})