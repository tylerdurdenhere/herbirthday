window.addEventListener('DOMContentLoaded', () => {
  // --- Theme handling ---
  const preferredTheme = localStorage.getItem('preferred-theme');
  if (preferredTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (!preferredTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  }

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('preferred-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }

  // --- Transition screens ---
  const introScreen = document.getElementById('intro-screen');
  const birthdayScreen = document.getElementById('birthday-screen');
  const messageScreen = document.getElementById('message-screen');

  if (introScreen && birthdayScreen && messageScreen) {
    // Step 1: Hide intro after 5.5s
    setTimeout(() => {
      introScreen.classList.add('hidden');
      birthdayScreen.classList.remove('hidden');

      // Step 2: After 5s, hide birthday and show message
      setTimeout(() => {
        birthdayScreen.classList.add('fade-out');        
        setTimeout(() => {
          birthdayScreen.classList.add('hidden');
          messageScreen.classList.remove('hidden');
          messageScreen.classList.add('fade-in');
        }, 1000);
      }, 5000);
    }, 5500);
  }
});

// --- Secret Message Flow ---
const heartBtn = document.getElementById('heart-button');
const secretModal = document.getElementById('secret-modal');
const readyBtn = document.getElementById('ready-button');
const pinScreen = document.getElementById('pin-screen');
const pinInput = document.getElementById('pin-input');
const submitPin = document.getElementById('submit-pin');
const secretMessage = document.getElementById('secret-message');
const pinError = document.getElementById('pin-error');

// Pin (Set your own)
const CORRECT_PIN = "9616";

// Click heart to open special modal
heartBtn.addEventListener('click', () => {
  secretModal.classList.remove('hidden');
});

// Click 'Ready?' to show pin input
readyBtn.addEventListener('click', () => {
  secretModal.classList.add('hidden');
  pinScreen.classList.remove('hidden');
});

// Submit pin
submitPin.addEventListener('click', () => {
  if (pinInput.value === CORRECT_PIN) {
    pinScreen.classList.add('hidden');
    secretMessage.classList.remove('hidden');
  } else {
    pinError.classList.remove('hidden');
    pinInput.value = '';
  }
});

// Close buttons for each screen
document.querySelectorAll('.close-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-close');
    const target = document.getElementById(targetId);
    if (target) target.classList.add('hidden');

    // Optional: Reset input and error
    if (targetId === 'pin-screen') {
      pinInput.value = '';
      pinError.classList.add('hidden');
    }
  });
});

// window.addEventListener('DOMContentLoaded', () => {
//   const music = document.getElementById('bg-music');
//   music.volume = 100;

//   // Auto-play after user interaction
//   document.body.addEventListener('click', () => {
//     if (music.paused) music.play();
//   }, { once: true });
// });
