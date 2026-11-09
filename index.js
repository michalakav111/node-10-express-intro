// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

const express = require("express");
const app = express();

// Part 1
app.get('/greet', (req, res) => {
    const TIMESTAMP = new Date().toISOString();

    res.json({
        msg: `hi from get endpoint ${TIMESTAMP}`
    });
});

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

app.get('/greet/:name', (req, res) => {
    console.log("PARAM ROUTE WORKS!");
    const { name } = req.params;

    console.log(`i got name: ${name}`);

    res.json({ msg: `got name: ${name}` });
});

app.get('/test', async (req, res) => {
    try {
        const response = await fetch("http://localhost:3000/greet/Bob");
        const data = await response.json();

        if (data.msg && data.msg.includes("Bob")) {
            res.json({ result: "ok" });
        } else {
            res.json({ result: "fail" });
        }

    } catch (err) {
        console.error(err);
        res.json({ result: "fail" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});







// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

app.use(express.json());

app.post('/action', async (req, res) => {

    // בדיקת תקינות ה-Body
    if (
        !req.body ||
        typeof req.body !== 'object' ||
        Array.isArray(req.body) ||
        Object.keys(req.body).length !== 1 ||
        !['joke', 'cat fact'].includes(req.body.action)
    ) {
        return res.status(400).json({
            msg: "body is malformed"
        });
    }

    const { action } = req.body;

    // Joke
    if (action === 'joke') {
        const response = await fetch(
            'https://v2.jokeapi.dev/joke/Any?type=single&safe-mode'
        );

        const data = await response.json();

        return res.json({
            joke: data.joke.toUpperCase()
        });
    }

    // Cat Fact
    if (action === 'cat fact') {
        const response = await fetch(
            'https://api.thecatapi.com/v1/images/search?limit=11',
            {
                headers: {
                    'x-api-key': process.env.CAT_API_KEY
                }
            }
        );

        const data = await response.json();

        return res.json({
            length: String(data.length)
        });
    }

});
