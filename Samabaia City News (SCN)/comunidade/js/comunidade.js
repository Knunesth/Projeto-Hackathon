document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('span#toggleButton');
    const imageUploadDiv = document.querySelector('div.mb-3');
  
    
    if (imageUploadDiv) {
      imageUploadDiv.style.display = 'none';
    }
  
    
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        if (imageUploadDiv) {
        
          imageUploadDiv.style.display =
            imageUploadDiv.style.display === 'none' ? 'block' : 'none';
        }
      });
    }
  });
  