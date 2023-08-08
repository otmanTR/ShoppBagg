const generateButtonContainer = document.createElement('div');
generateButtonContainer.classList.add('generate-button-container'); // Add a class for styling

const generateButton = document.createElement('button');
generateButton.id = 'generate-coupon';
generateButton.textContent = 'Generate your coupon';

generateButton.addEventListener('click', () => {
  displayPopup();
});

generateButtonContainer.appendChild(generateButton);
document.body.appendChild(generateButtonContainer);

const overlayClickListener = (event) => {
  if (event.target.classList.contains('overlay')) {
    closePopup();
  }
 
};


function displayPopup() {
  const popUpCard = `
  
    <div class="overlay"></div>
    <div class="popup-container">
      <div class="popup">
        <div class="left-side">
         <img class="picture" src="https://deih43ym53wif.cloudfront.net/machu-picchu-peru-shutterstock_1044047035_a66ac3ba1f.jpeg" alt="Image">
        </div>
        <div class="right-side">
        <p id="close-button">x</p>
          <h2 id="form-head">Title</h2>
          <p id="form-description">Short Text</p>
          <h2 id="response-head" style="display: none;">Amazing</h2>
          <p id="response-description" style="display: none;">Here is your discount code you can use in your next order. This coupon code will be valid until 01.01.2024.</p>
          <form id="popup-form">
            <input type="email" id="email" placeholder="Email" required>
            <input type="phone" id="phone" pattern="[0-9]{10}" placeholder="Phone" required>
            <button id="submit-button">BE FIRST</button>
            <label for="gdpr-checkbox" id="checkbox-container">
              <input type="checkbox" id="gdpr-checkbox">
              <a class="link" href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation" target="_blank">By submitting this form, you are giving consent for your e-mail to be used and disclosed.*</a>.
            </label>
          </form>
          <p id="response-message"></p>
          <button id="copy-button" style="display: none;">Copy</button>
          
        </div>
      </div>
    </div>
  `;

  const body = document.querySelector('body');
  body.innerHTML += popUpCard;

  const checkboxContainer = document.getElementById("checkbox-container");
  const responseHead = document.getElementById('response-head');
  const responseDescription = document.getElementById('response-description');
  const formDescription = document.getElementById('form-description');
  const formHead = document.getElementById('form-head');
  const submitButton = document.getElementById('submit-button');
  const gdprCheckbox = document.getElementById('gdpr-checkbox');
  const responseMessage = document.getElementById('response-message');
  const copyButton = document.getElementById('copy-button');
  const popupForm = document.getElementById('popup-form');

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!gdprCheckbox.checked || !popupForm.checkValidity()) {
      responseMessage.textContent = 'Please accept GDPR and fill in valid data.';
      return;
    }

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const data = {
      email: email,
      phone: phone,
    };

    try {
      const response = await fetch('https://opt-interview-projects.onrender.com/lead-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
         const couponCode = responseData.coupon_code;
        responseMessage.textContent = couponCode;
        checkboxContainer.style.display = "none"
        formDescription.style.display = 'none';
        responseDescription.style.display = 'block';
        responseHead.style.display = 'block';
        formHead.style.display = 'none';
        submitButton.style.display = 'none';
        gdprCheckbox.style.display = 'none';
        document.getElementById('email').style.display = 'none';
        document.getElementById('phone').style.display = 'none';
        copyButton.style.display = 'block';
      } else {
        responseMessage.textContent = 'Invalid data';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  copyButton.addEventListener('click', () => {
    const couponCode = responseMessage.textContent; 
    navigator.clipboard.writeText(couponCode).then(() => {
      alert('Coupon code copied to clipboard: ' + couponCode);
      location.reload(); 
    });
  });
  
  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener('click', () => {
    closePopup();
    location.reload();
  });

  // Reattach the overlay click listener
  document.addEventListener('click', overlayClickListener);

  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
      opacity: 0.2;
    }
    
    .popup-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      z-index: 101;
    }

  `;
  document.head.appendChild(styleElement);
}




function closePopup() {
  const popupContainer = document.querySelector('.popup-container');
  if (popupContainer) {
    popupContainer.remove();
  }

  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.remove();
  }

  document.getElementById('generate-coupon').style.display = 'block';

  document.removeEventListener('click', overlayClickListener);
}


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('overlay')) {
    closePopup();
  }
});
displayPopup();