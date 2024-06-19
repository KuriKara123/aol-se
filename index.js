const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const path = require("path"); 
const socketIo = require('socket.io');

const app = express();
const server = require("http").createServer(app);

const io = socketIo(server);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: "userId",
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});


app.use(express.static(path.join(__dirname, "public")));

app.get("/landing", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "landing-page", "landing.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup-page", "signup.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login-page", "login.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home-page", "home.html"));
});

app.get("/chatime", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "detail-page", "chatime.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat-page", "chat.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about-page", "about.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "list-page", "list.html"));
});

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});


app.post("/register", (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required" });
    }

    db.query("INSERT INTO account (username, password) VALUES (?, ?)", [name, password], (err, result) => {
        if (err) {
            console.error("Error inserting user data into database: " + err);
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log("User data inserted into database successfully");
        res.status(200).json({ message: "User registered successfully" });
    });
});


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    db.query("SELECT * FROM account WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            console.error("Error querying database: " + err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ username: username }, "secretkey");
        res.json({ token: token, redirectUrl: "/home" });
    });
});


app.post('/addProduct', (req, res) => {
    const { productname, price, category } = req.body;
    const sql = 'INSERT INTO product (productname, price, category) VALUES (?, ?, ?)';
    db.query(sql, [productname, price, category], (err, result) => {
        if (err) {
            console.error('Error inserting product data: ' + err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Product added successfully' });
    });
});


app.post('/addOrder', (req, res) => {
    const { productid, userid, subtotal, quantity } = req.body;
    const sql = 'INSERT INTO orders (productid, userid, subtotal, quantity) VALUES (?, ?, ?, ?)';
    db.query(sql, [productid, userid, subtotal, quantity], (err, result) => {
        if (err) {
            console.error('Error inserting order data: ' + err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Order added successfully' });
    });
});


app.get('/orders', (req, res) => {
    const sql = `
        SELECT orders.orderid, product.productname, account.username, orders.date, orders.subtotal, orders.quantity 
        FROM orders 
        JOIN product ON orders.productid = product.productid 
        JOIN account ON orders.userid = account.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching orders: ' + err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
