const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('nav');
  const icon = document.getElementById('hamburger-icon');
  
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    if (isActive) {
      icon.src = 'images/icons/x.png';
      icon.alt = 'close menu';
    } else {
      icon.src = 'images/icons/menu.png';
      icon.alt = 'open menu';
    }
  });
