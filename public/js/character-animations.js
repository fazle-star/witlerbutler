// Add data-char attributes to all character images
document.addEventListener('DOMContentLoaded', function() {
    // Get all character image elements
    const characterImages = document.querySelectorAll('.character-image');
    
    // Define character names in order of appearance
    const characterNames = ['risol', 'darlyne', 'thalita', 'ignis', 'valthea'];
    
    // Add data-char attribute to each character image
    characterImages.forEach((img, index) => {
        if (index < characterNames.length) {
            img.setAttribute('data-char', characterNames[index]);
        }
    });

    // Initialize character images with their respective backgrounds
    initializeCharacterImages();
});

// Function to initialize character images with their respective backgrounds
function initializeCharacterImages() {
    const characterImages = document.querySelectorAll('.character-image[data-char]');;
    
    characterImages.forEach(img => {
        const char = img.getAttribute('data-char');
        
        // Set the initial background image based on the character
        switch(char) {
            case 'risol':
                img.style.backgroundImage = 'url("risolimg/risol.png")';
                break;
            case 'darlyne':
                img.style.backgroundImage = 'url("darlyneimg/ppdar.jpg")';
                break;
            case 'thalita':
                img.style.backgroundImage = 'url("thalitaimg/pplita.jpg")';
                break;
            case 'ignis':
                img.style.backgroundImage = 'url("ignisimg/ppignis.jpg")';
                break;
            case 'valthea':
                img.style.backgroundImage = 'url("valtheaimg/ppthea.jpg")';
                break;
        }
        
        // Add hover effect
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}
