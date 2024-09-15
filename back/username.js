document.getElementById('cvForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Create the CV object
    const cvData = { name, email, experience, skills };

    try {
        // Send CV data to the backend
        const response = await fetch('/saveCV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cvData),
        });

        const result = await response.json();
        if (result.success) {
            const uniqueId = result.uniqueId;
            const shareableLink = `http://localhost:3000/cv/${uniqueId}`;
            
            // Display the unique link to the user
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            const linkElement = document.getElementById('shareableLink');
            linkElement.href = shareableLink;
            linkElement.textContent = shareableLink;
        } else {
            alert('Error generating CV');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
