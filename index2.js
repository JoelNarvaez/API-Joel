import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/asteroids", async (req, res) => {
    try {
        const response = await axios.get("https://ssd-api.jpl.nasa.gov/cad.api?dist-max=0.05&sort=dist");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo los datos de la NASA", details: error.message });
    }
});

app.get("/object/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo la información del objeto", details: error.message });
    }
});

app.post("/registro", async (req, res) => {
    const { name, job, email } = req.body; 

    if (!name || !job || !email) {
        return res.status(400).json({ error: "Se requieren los campos 'name' y 'job' y 'email'" });
    }

    try {
        const response = await axios.post("https://webhook.site/c86a37fa-8a12-48e3-a35a-60fbce1fac28", {
            name,
            job,
            email
        });

        res.json(response.data); 
    } catch (error) {
        res.status(500).json({ error: "Error enviando la solicitud", details: error.message });
    }
});

app.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001 🚀");
});

// post
/*
{
    "name": "Joel",
    "job": "Programador",
    "email": "uaa.mx"
}*/

// https://ssd-api.jpl.nasa.gov/doc/cad.html
// https://ssd-api.jpl.nasa.gov/doc/sbdb.html