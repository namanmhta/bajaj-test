const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

// ✅ Root Route (Prevents "Cannot GET /")
app.get("/", (req, res) => {
    res.send("API is running. Use /bfhl for GET and POST requests.");
});

// ✅ GET /bfhl - Returns operation code
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// ✅ POST /bfhl - Processes input data
app.post("/bfhl", (req, res) => {
    console.log("Received request body:", req.body); // ✅ Debug log

    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input. Expected JSON with 'data' array." });
    }

    let numbers = [];
    let alphabets = [];

    for (let item of data) {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
        }
    }

    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

    res.json({
        is_success: true,
        user_id: "Naman_Mehta_22032003",
        email: "22bcs14782@cuchd.in",
        roll_number: "22bcs14782",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});


// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
