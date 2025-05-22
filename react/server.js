import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Proxy endpoint for UniProt by accession
app.get('/uniprot/:accession', async (req, res) => {
    const accession = req.params.accession;
    const url = `https://rest.uniprot.org/uniprotkb/${accession}.json`;
    try {
        const apiRes = await fetch(url);
        if (!apiRes.ok) {
            return res.status(apiRes.status).json({ error: "Not found" });
        }
        const data = await apiRes.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3002, () => {
    console.log('Proxy server running on http://localhost:3002');
});