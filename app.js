function app() {

  var userName = 'Anonymous Cat';  // sets a default username
  _updateUsernameInitial();  // shows username initial in the user box

  // 1. Insert the Firebase Database initialization code



  // 3. Set a callback to execute 'loadMessages' when the value of the 
  // 'messages' reference changes


  function sendMessage() {
    var messageText = document.getElementById('messageInput').value;
    document.getElementById('messageInput').value = '';

    var messageObject = {
      userName: userName,
      messageText: messageText
    }
    // 2. Replace the next 2 lines to Push the messageObject to the 'messages'  
    // reference in the database instead of displaying the message in the UI
    _displayMessage(userName, messageText);
    _scrollToBottom();
  }

  function loadMessages(snapshot) {
    _clearAllMessages();
    snapshot.forEach(msg => {
      var messageObject = msg.val();
      // 4. Call the function _displayMessage to display each message in the
      // user interface

    });
    _scrollToBottom();
  }

  /**
   *           ========= CHAT APP LOGIC ==========
   *           Feel free to make any changes to the
   *           chat application once you have finished
   *           the rest of tasks :)
   */

  /**
   * Adds a new message to the User Interface
   */
  function _displayMessage(userName, messageText) {
    var userInitial = userName.charAt(0).toUpperCase();
    
    var newMessageElement = document.createElement('div');
    newMessageElement.classList.add('message');
    newMessageElement.innerHTML = `
    <div class="avatar">${userInitial}</div>
    <div class="message-container">
      <div class="username">${userName}</div>
      <div class="message-text">${messageText}</div>
    </div>`;

    document.querySelector('main').appendChild(newMessageElement);
  }

  /**
   * Removes all previously added messages of the User Interface 
   */
  function _clearAllMessages() {
    var messagesContainer = document.querySelector('main');
    while (messagesContainer.firstChild) {
      messagesContainer.removeChild(messagesContainer.firstChild);
    }
  }

  /**
   * Returns the username's initial letter
   */
  function _getUsernameInitial() {
    return userName.charAt(0).toUpperCase();
  }

  /**
   * Updates the Username initial in the top right corner
   */
  function _updateUsernameInitial() {
    document.getElementById('avatar').innerText = _getUsernameInitial()
  }

  /**
   * Scrolls the page to the bottom to display the latest message
   */
  function _scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  /**
   * Executes sendMessage when the button "SEND" is pressed
   */
  document.getElementById('sendButton').addEventListener('click', sendMessage);

  /**
   * Executes sendMessage when the key "enter" is pressed
   */
  document.getElementById('messageInput').addEventListener('keypress', (e) => {
    var key = e.which || e.keyCode;
    if (key === 13) {
      sendMessage();
    }
  });

  /**
   * Displays a prompt to change the username when the initial on the top
   * right corner is pressed
   */
  document.getElementById('avatar').addEventListener('click', () => {
    userName = prompt('Enter your name');
    _updateUsernameInitial();
  }); 
}

window.addEventListener('DOMContentLoaded', app);  // load app when the site is loaded
