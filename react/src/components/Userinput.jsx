import React from 'react'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Navbar from './Navbar';

import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
    SignUpButton
} from '@clerk/clerk-react';
async function getProteinData(geneName) {
    const url = `https://rest.uniprot.org/uniprotkb/search?query=gene:${geneName}+AND+organism_id:9606&format=json&size=1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch UniProt data");
    return await response.json();
}
async function getProteinDetails(accession) {
    const url = `https://rest.uniprot.org/uniprotkb/${accession}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch UniProt details");
    return await response.json();
}


getProteinData;

// Helper functions for external APIs
async function get3DStructure(accession) {
    // AlphaFold structure availability
    const url = `https://alphafold.ebi.ac.uk/api/prediction/${accession}`;
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        return data.length > 0 ? data[0].structures[0]?.url : null;
    } catch {
        return null;
    }
}

async function getDrugAssociations(accession) {
    // ChEMBL target search by UniProt accession
    const url = `https://www.ebi.ac.uk/chembl/api/data/target?target_components__accession=${accession}`;
    try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const data = await res.json();
        if (!data.targets || data.targets.length === 0) return [];
        // Get drugs for the first target found
        const targetId = data.targets[0].target_chembl_id;
        const actUrl = `https://www.ebi.ac.uk/chembl/api/data/activity?target_chembl_id=${targetId}&limit=5`;
        const actRes = await fetch(actUrl);
        if (!actRes.ok) return [];
        const actData = await actRes.json();
        return actData.activities?.map(a => a.molecule_chembl_id) || [];
    } catch {
        return [];
    }
}

async function getDiseaseAssociations(accession) {
    // DisGeNET gene-disease associations by UniProt accession
    const url = `https://www.disgenet.org/api/gda/gene/${accession}?source=ALL`;
    try {
        const res = await fetch(url, { headers: { "Accept": "application/json" } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.slice(0, 5).map(d => d.disease_name);
    } catch {
        return [];
    }
}

async function getProteinInteractions(accession) {
    // STRING DB interactions
    const url = `https://string-db.org/api/json/interaction_partners?identifiers=${accession}&limit=5`;
    try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const data = await res.json();
        return data.map(i => i.preferredName_B);
    } catch {
        return [];
    }
}

const handleEnter = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSend();
    }
}

const Userinput = () => {

    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Welcome to Aminoverse! \n\nI can help you explore proteins and their functions. Try asking about any human protein or gene, for example:\n\n• TP53\n• IL6\n• F5\n• SRY\n\nWhat would you like to know?'
        }
    ])
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSend = async () => {
        if (input.trim() === "") return;

        const currentInput = input.trim();
        setMessages((prev) => [...prev, { sender: "user", text: currentInput }]);
        setInput("");

        setMessages((prev) => [...prev, { sender: "bot", text: "🔄 Loading..." }]);
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const data = await getProteinData(currentInput);
            setMessages((prev) => prev.filter(msg => msg.text !== "🔄 Loading..."));

            if (data.results && data.results.length > 0) {
                const result = data.results[0];

                const proteinName = result.proteinDescription?.recommendedName?.fullName?.value || "N/A";
                const accession = result.primaryAccession || "N/A";
                const scientificName = result.organism?.scientificName || "N/A";
                const geneName = result.genes?.[0]?.geneName?.value || "N/A";

                const details = await getProteinDetails(accession);

                // Improved function text extraction
                let functionText = "No function description found";
                if (details.comments) {
                    const functionComments = details.comments.filter(comment =>
                        comment.commentType === "FUNCTION" ||
                        comment.commentType === "CATALYTIC_ACTIVITY" ||
                        comment.commentType === "PATHWAY"
                    );

                    if (functionComments.length > 0) {
                        functionText = functionComments
                            .map(comment => {
                                if (comment.commentType === "FUNCTION") {
                                    return comment.texts?.map(t => t.value).join("\n") || "";
                                } else if (comment.commentType === "CATALYTIC_ACTIVITY") {
                                    return `Catalytic Activity: ${comment.reaction?.name || ""}`;
                                } else if (comment.commentType === "PATHWAY") {
                                    return `Pathway: ${comment.texts?.map(t => t.value).join("\n") || ""}`;
                                }
                                return "";
                            })
                            .filter(text => text)
                            .join("\n\n");
                    }
                }

                // Get additional data
                const [structureUrl, drugs, diseases, interactions] = await Promise.all([
                    get3DStructure(accession),
                    getDrugAssociations(accession),
                    getDiseaseAssociations(accession),
                    getProteinInteractions(accession)
                ]);

                const botReply = (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-blue-400">Protein Details</h2>
                        <div className="space-y-2">
                            <div><b>Full Name:</b> {proteinName}</div>
                            <div><b>Accession ID:</b> {accession}</div>
                            <div><b>Scientific Name:</b> {scientificName}</div>
                            <div><b>Gene Name:</b> {geneName}</div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-400">Function & Activity</h3>
                            <div className="mt-2 whitespace-pre-wrap">{functionText}</div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-400">3D Structure</h3>
                            <div className="mt-2">
                                {structureUrl ? (
                                    <a
                                        href={structureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        View Structure
                                    </a>
                                ) : "Not available"}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-400">Drug Associations</h3>
                            <div className="mt-2">
                                {drugs.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {drugs.map((drug, index) => (
                                            <li key={index}>{drug}</li>
                                        ))}
                                    </ul>
                                ) : "None found"}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-400">Diseases Linked</h3>
                            <div className="mt-2">
                                {diseases.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {diseases.map((disease, index) => (
                                            <li key={index}>{disease}</li>
                                        ))}
                                    </ul>
                                ) : "None found"}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-blue-400">Protein Interactions</h3>
                            <div className="mt-2">
                                {interactions.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {interactions.map((interaction, index) => (
                                            <li key={index}>{interaction}</li>
                                        ))}
                                    </ul>
                                ) : "None found"}
                            </div>
                        </div>
                    </div>
                );

                setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
            } else {
                setMessages((prev) => [...prev, {
                    sender: "bot",
                    text: "I couldn't find any data for that protein/gene. Please check the spelling and try again. You can try examples like TP53, BRCA1, F5, or SRY."
                }]);
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, {
                sender: "bot",
                text: "Sorry, I encountered an error while fetching the data. Please try again or check if the protein/gene name is correct."
            }]);
        }
    };

    const handleClearText = () => {
        setMessages([]);
        setInput("");
    }


    return (

        <>
            <div className='h-screen flex flex-col'>
                <div className='felx '>
                    <Navbar />


                </div>

                <div className='flex flex-1 overflow-hidden'>
                    <div className='hidden sm:flex flex-col justify-between h-full bg-[#000818] border-r border-gray-700 p-4 w-[200px]'>
                        <div className="upperside">
                            <button className='p-2 border border-white rounded-lg hover:bg-gray-800 w-[167px] transition-colors' onClick={handleClearText}>New chat</button>
                        </div>
                        <div className="lowerside flex flex-col gap-3">
                            <button className='p-2 border border-white rounded-lg hover:bg-gray-800 transition-colors'>settings</button>
                            <button className='p-2 rounded-lg bg-red-400 hover:bg-red-500 transition-colors'>Log Out</button>
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
                            <div className="max-w-4xl mx-auto space-y-6">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`p-4 rounded-2xl ${msg.sender === 'user'
                                                ? 'bg-[#000818] ml-4'
                                                : 'bg-[#1a1a1a] mr-4'
                                                } max-w-[85%] md:max-w-[75%]`}
                                        >
                                            <p className="text-white break-words whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-700 p-4">
                            <div className="max-w-3xl mx-auto flex items-center gap-4">
                                <input
                                    type="text"
                                    className='flex-1 p-4 rounded-lg bg-transparent border border-gray-700 focus:border-blue-500 focus:outline-none text-white'
                                    placeholder='Enter valid protein name : example F5 , TP53 ,SRY '
                                    value={input}
                                    onChange={handleChange}
                                    onKeyDown={handleEnter}
                                    autoFocus
                                />
                                <Button
                                    variant="contained"
                                    className='bg-blue-500 hover:bg-blue-600 h-[50px]'
                                    onClick={handleSend}
                                    endIcon={<SendIcon />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userinput
