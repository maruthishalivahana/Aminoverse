


async function getProteinData(input) {
    let url = "https://rest.uniprot.org/uniprotkb/P04637"
    const query = "P04637";
    const response = await fetch(`https://rest.uniprot.org/uniprotkb/search?query=${input}&format=json`);
    const data = await response.json();
    console.log(data);
    return data // just for testing
    // setProteinData(data);
}
export default getProteinData;
