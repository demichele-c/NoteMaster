const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  
  // Remove the hidden class from the install button
  butInstall.style.display = 'block'; 
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Clear the deferred prompt variable since it can only be used once
    deferredPrompt = null;
    
    // Hide the install button
    butInstall.style.display = 'none';
    
    console.log(`User response to the install prompt: ${outcome}`);
  }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Hide the install button after the app has been installed
  butInstall.style.display = 'none';
  
  console.log('PWA was installed successfully!', event);
});
