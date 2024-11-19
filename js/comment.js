// Function to save a comment to localStorage
function saveComment(username, profileImage, comment, date) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    const newComment = {
        username,
        profileImage,
        comment,
        date 
    };
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
}


function displayComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    comments.forEach(commentData => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment-item');

        const userImage = document.createElement('img');
        userImage.src = commentData.profileImage || 'image/user.jpg'; 

        
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('comment-content');

        
        const usernameElement = document.createElement('div');
        usernameElement.classList.add('username');
        usernameElement.textContent = commentData.username || 'profile'; 

        const commentTextElement = document.createElement('div');
        commentTextElement.textContent = commentData.comment;

        
        const dateElement = document.createElement('div');
        dateElement.classList.add('comment-date');
        dateElement.textContent = commentData.date; 

  
        contentContainer.appendChild(usernameElement);
        contentContainer.appendChild(commentTextElement);
        contentContainer.appendChild(dateElement);

       
        commentElement.appendChild(userImage);
        commentElement.appendChild(contentContainer);

        commentsList.appendChild(commentElement);
    });
}


document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    let username = document.getElementById('username').value.trim();
    const commentText = document.getElementById('commentInput').value.trim();
    const profileImage = document.getElementById('profileImage').files[0];

    
    if (!username) {
        username = 'profile';
    }

    const defaultProfileImage = 'image/user.jpg'; 

    
    const currentDate = new Date();
    const dateString = currentDate.toLocaleString(); 

    if (!profileImage) {
        saveComment(username, defaultProfileImage, commentText, dateString); 
        displayComments(); 
    } else {
      
        const reader = new FileReader();
        reader.onloadend = function() {
            saveComment(username, reader.result, commentText, dateString); 
            displayComments(); 
        };
        reader.readAsDataURL(profileImage);
    }

    
    document.getElementById('username').value = '';
    document.getElementById('commentInput').value = '';
    document.getElementById('profileImage').value = '';
});

// Display comments when the page loads
window.onload = displayComments;

