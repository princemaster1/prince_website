// Function to hide the loader and display the website content when everything is loaded
window.addEventListener("load", function () {
  // Get the loader element
  const loaderContainer = document.querySelector(".loader-container");
  // Hide the loader
  loaderContainer.style.display = "none";

  // Display the website content by removing a class that hides it
  document.body.classList.remove("hidden-content");
});

// Function to track and display loading progress
document.addEventListener("DOMContentLoaded", function () {
  const assetsToLoad = document.querySelectorAll('img, script, link[rel="stylesheet"]');
  const progressBar = document.getElementById("loader-progress-bar");
  const percentageText = document.getElementById("loader-percentage");
  const loaderQuotes = document.getElementById("loader-quotes");

  let loadedAssets = 10;

  const showNetworkQuote = () => {
    loaderQuotes.textContent = "Your network is slow but I'll still load 😒...";
    loaderQuotes.style.color = "red";
  };

  const loadingTimeout = setTimeout(showNetworkQuote, 30000); // Show the quote after 11 seconds

  assetsToLoad.forEach((asset) => {
    asset.addEventListener("load", assetLoaded);
  });

  function assetLoaded() {
    loadedAssets++;

    if (loadedAssets >= assetsToLoad.length) {
      clearTimeout(loadingTimeout); // Cancel the timeout if loading completes
      // Loading is complete
      progressBar.style.width = "100%";
      percentageText.textContent = "100%";
      percentageText.style.color = "green"; // Change color when loading is complete
    } else {
      const percentage = Math.round((loadedAssets / assetsToLoad.length) * 100);

      // Change progress bar color based on the percentage
      if (percentage >= 90) {
        progressBar.style.backgroundColor = "green";
        loaderQuotes.style.color = "green";
        loaderQuotes.textContent = "Loading is complete! 😡";
      } else if (percentage >= 80) {
        loaderQuotes.textContent = "Closer than ever... 😨";
        loaderQuotes.style.color = "lightgreen";
        progressBar.style.backgroundColor = "lightgreen";
      } else if (percentage >= 70 || percentage === 79) {
        loaderQuotes.textContent = "Almost there! ☺";
        loaderQuotes.style.color = "#8aff8a";
        progressBar.style.backgroundColor = "#8aff8a";
      } else if (percentage >= 60 || percentage === 69) {
        loaderQuotes.textContent = "Halfway there... 🙂";
        loaderQuotes.style.color = "orange";
        progressBar.style.backgroundColor = "orange";
      } else if (percentage >= 50 || percentage === 59) {
        loaderQuotes.textContent = "Patience, please... 😃";
        loaderQuotes.style.color = "blue";
        progressBar.style.backgroundColor = "blue";
      } else if (percentage >= 40 || percentage === 49) {
        loaderQuotes.textContent = "Keep waiting... 😁";
        loaderQuotes.style.color = "cyan";
        progressBar.style.backgroundColor = "cyan";
      } else if (percentage >= 30 || percentage === 39) {
        loaderQuotes.textContent = "Making progress... 😀";
        loaderQuotes.style.color = "lightgreen";
        progressBar.style.backgroundColor = "lightgreen";
      } else {
        progressBar.style.backgroundColor = "black";
      }

      progressBar.style.width = percentage + "%";
      percentageText.textContent = percentage + "%";
    }
  }
});


// Get the elements by their ids
var downloadBtn = document.getElementById("download-button");
var countBox = document.getElementById("count");
var count = document.getElementById("count");

// Initialize a variable to store the number of downloads
var downloads = parseInt(localStorage.getItem("downloadCount")) || 0; // Retrieve the count from localStorage

// Update the count element with the stored value
count.textContent = downloads;

// Add an event listener to the download button
downloadBtn.addEventListener("click", function() {
  // Increment the number of downloads by one
  downloads++;

  // Save the updated count to localStorage
  localStorage.setItem("downloadCount", downloads);

  // Update the count element with the new value
  count.textContent = downloads;

  // Send an HTTP request to update the server with the new count
  updateServerDownloadCount(downloads);
});

// Function to send an HTTP request to update the server with the new download count
function updateServerDownloadCount(newCount) {
  // Make an HTTP request to your server to update the count
  // Replace 'your_server_endpoint' with the actual URL where you handle the count update
  fetch('your_server_endpoint', {
    method: 'POST', // You can use POST or another suitable method
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ count: newCount })
  })
  .then(response => {
    // Handle the server's response, if needed
  })
  .catch(error => {
    console.error('Error updating the server download count:', error);
  });
}



// Dark Mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const button = document.getElementById("dark-mode-toggle-button");
  const icon = button.querySelector("img");

  if (body.classList.contains("dark-mode")) {
    icon.src = "light.png";
  } else {
    icon.src = "dark.png";
  }
}

// Scroll animation
function checkScroll() {
  var elements = document.querySelectorAll('.animatedi');

  elements.forEach(function(element) {
    var position = element.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

// Add a scroll event listener to trigger the animation function
window.addEventListener('scroll', checkScroll);

// Initial check in case some elements are already in view on page load
checkScroll();


//Notification
var notificationVisible = true;

function toggleNotification() {
    var notificationContainer = document.getElementById("notification-container");
    notificationVisible = !notificationVisible;

    if (notificationVisible) {
        notificationContainer.style.display = "block";
    } else {
        notificationContainer.style.display = "none";
    }
}

function closeNotification() {
    var notificationContainer = document.getElementById("notification-container");
    notificationContainer.style.display = "none";
    notificationVisible = true;
}




var blockStartTime = null;
var blockStopTime = null;

var webBlocker = document.querySelector('.blockerbody');
var isWebBlocked = false;
var showDetails = false;

// Load the previously set times from local storage
var savedStartTime = localStorage.getItem('blockStartTime');
var savedStopTime = localStorage.getItem('blockStopTime');
if (savedStartTime && savedStopTime) {
    document.getElementById('start-time-input').value = savedStartTime;
    document.getElementById('stop-time-input').value = savedStopTime;
    setWebBlockerStatus(new Date(savedStartTime).getTime(), new Date(savedStopTime).getTime());
}

function toggleWebBlocker() {
    if (isWebBlocked) {
        webBlocker.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        webBlocker.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

function setWebBlockerStatus(start, stop) {
    blockStartTime = start;
    blockStopTime = stop;
    var currentTime = new Date().getTime();

    if (currentTime >= blockStartTime && currentTime <= blockStopTime) {
        isWebBlocked = true;
    } else {
        isWebBlocked = false;
    }
    toggleWebBlocker();
}

function toggleMaintenanceDetails() {
    showDetails = !showDetails;
    var maintenanceDetails = document.getElementById('maintenance-details');
    var toggleButton = document.getElementById('toggle-details');
    if (showDetails) {
        maintenanceDetails.classList.remove('hidden');
        toggleButton.textContent = 'Hide Maintenance Details';
    } else {
        maintenanceDetails.classList.add('hidden');
        toggleButton.textContent = 'Show Maintenance Details';
    }
}

document.getElementById('set-time-button').addEventListener('click', function () {
    var startDateTime = new Date(document.getElementById('start-time-input').value).getTime();
    var stopDateTime = new Date(document.getElementById('stop-time-input').value).getTime();
    setWebBlockerStatus(startDateTime, stopDateTime);

    // Save the times in local storage
    localStorage.setItem('blockStartTime', document.getElementById('start-time-input').value);
    localStorage.setItem('blockStopTime', document.getElementById('stop-time-input').value);
});

document.getElementById('show-schedule-button').addEventListener('click', function () {
    if (blockStartTime !== null && blockStopTime !== null) {
        var blockStartString = new Date(blockStartTime).toLocaleString();
        var blockStopString = new Date(blockStopTime).toLocaleString();
        alert('The web blocker is scheduled from ' + blockStartString + ' to ' + blockStopString);
    } else {
        alert('No schedule is set.');
    }
});

document.getElementById('activate-maintenance-button').addEventListener('click', function () {
    isWebBlocked = !isWebBlocked;
    if (isWebBlocked) {
        // Activate the web blocker without specific start and end times
        toggleWebBlocker();
    } else {
        // Deactivate the web blocker
        setWebBlockerStatus(null, null);
    }
});

document.getElementById('toggle-details').addEventListener('click', toggleMaintenanceDetails);



var pin = "111111";
var isPanelVisible = false;

document.getElementById('help-button').addEventListener('click', function () {
    var enteredPin = prompt("Enter PIN to access the control panel:");
    if (enteredPin === pin) {
        toggleControlPanel();
    } else {
        alert("Invalid PIN. Access denied.");
    }
});

function toggleControlPanel() {
    var controlPanel = document.querySelector('.control-panel');
    isPanelVisible = !isPanelVisible;
    if (isPanelVisible) {
        controlPanel.classList.remove('hidden');
    } else {
        controlPanel.classList.add('hidden');
    }
}

//comment section
document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const commentInput = document.getElementById("comment-input");
  const submitButton = document.getElementById("submit-button");

  // Function to check if all fields are filled
  function areAllFieldsFilled() {
    return nameInput.value.trim() !== "" && emailInput.value.trim() !== "" && commentInput.value.trim() !== "";
  }

  // Function to redirect comments to an email
  function redirectToEmail() {
    const subject = "Comment from " + nameInput.value;
    const body = "Name: " + nameInput.value + "%0D%0AEmail: " + emailInput.value + "%0D%0AComment: " + commentInput.value;
    const mailtoLink = "mailto:princewhatsappofficial@gmail.com?subject=" + subject + "&body=" + body;
    window.location.href = mailtoLink;
  }

  // Disable the submit button initially
  submitButton.disabled = true;

  // Add event listeners to input fields to enable the submit button when all fields are filled
  nameInput.addEventListener("input", function () {
    submitButton.disabled = !areAllFieldsFilled();
  });

  emailInput.addEventListener("input", function () {
    submitButton.disabled = !areAllFieldsFilled();
  });

  commentInput.addEventListener("input", function () {
    submitButton.disabled = !areAllFieldsFilled();
  });

  // Add a click event listener to the submit button
  submitButton.addEventListener("click", function () {
    if (areAllFieldsFilled()) {
      redirectToEmail();
    }
  });
});


// Get a reference to the download button and download message element
const downloadButton = document.getElementById("download-button");
const downloadMessage = document.getElementById("download-message");

// Add a click event listener to the download button
downloadButton.addEventListener("click", () => {
  // Create a hidden anchor element to trigger the download
  const downloadLink = document.createElement("a");
  downloadLink.href = "princewhatsapp.apk"; // Replace with the actual URL
  downloadLink.download = "princewhatsapp.apk";

  // Trigger a click event on the anchor to initiate the download
  downloadLink.click();

  // Display the download message
  downloadMessage.style.display = "block";
});


document.addEventListener("DOMContentLoaded", function() {
  const textContent = document.getElementById("text-content");
  const heading = document.getElementById("heading");

  heading.addEventListener("click", function() {
    if (textContent.textContent === "princemaster") {
      textContent.textContent = "Prince_M-XIV";
    } else {
      textContent.textContent = "princemaster";
    }
  });
});

// Function to hide the loader and display the website content when everything is loaded
window.addEventListener("load", function () {
  // Get the loader element
  const loaderContainer = document.querySelector(".loader-container");
  // Hide the loader
  loaderContainer.style.display = "none";

  // Display the website content by removing a class that hides it
  document.body.classList.remove("hidden-content");
});




