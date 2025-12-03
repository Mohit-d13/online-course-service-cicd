const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator")

if (process.env.NODE_ENV != "production") {
	require("dotenv").config({ path: './.env.frontend' });
}

const app = express();

const port = 3000;
const backendUri = process.env.BACKEND_URI

// get data in json format
app.use(express.json());

// parse html form data
app.use(express.urlencoded({ extended: true }));

// get static files from public folder
app.use(express.static(path.join(__dirname, "public")))

// main route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

// enrollment form get route
app.get("/enrollment-form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "enrollment_form.html"))
});

validCourses = ["SRE", "DevOps", "Cloud Engineer"]

// enrollment form post route
app.post("/enrollment-form",
    [
        body('firstName').notEmpty().withMessage('First Name is required'),
        body('birthDate').isDate().withMessage('Date of Birth is required'),
        body('studentId').isNumeric().withMessage('Student ID is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('state').notEmpty().withMessage('State is required'),
        body('country').notEmpty().withMessage('Country is required'),
        body('zip').isNumeric().withMessage('Zip Code is required'),
        body('mobile').isMobilePhone().withMessage('Mobile Number is required'),
        body('course').isIn(validCourses).withMessage('Invalid course selected')
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("Validation passed");

        const { firstName, lastName, birthDate, address, city, state, country, zip, email, mobile, course } = req.body;

        try {
            const flaskres = await fetch(backendUri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, birthDate, address, city, state, country, zip, email, mobile, course }),
            });

            const result = await flaskres.json();
            res.send(`Flask says: ${result.message}`);
        } catch (error) {
            console.error("Error forwarding to Flask:", error);
            res.status(500).send("Error connecting to backend");
        }
    }
);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
