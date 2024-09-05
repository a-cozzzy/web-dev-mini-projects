import express from "express"
import mysql from "mysql"
import cors from "cors"

const app= express()
const PORT = 8800

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Adithi@2004",
    database:"test"
})

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");
});

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Helloo from backend!")
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM test.books"
    db.query(q,(err,data)=>{
        if(err) return res.json("Error fetching");
        return res.json(data)
    })

})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,

    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json("Error fetching");
        return res.json("Book has been created successfully ")
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q ="DELETE FROM books WHERE id= ?"
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json("Error deleting");
        return res.json("Book has been deleted successfully ")
        })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error updating");
        }
        if (data.affectedRows > 0) {
            return res.json("Book has been updated successfully");
        } else {
            return res.status(404).json("Book not found");
        }
    });
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}. Connected to backend yayy! jingalala`)
})