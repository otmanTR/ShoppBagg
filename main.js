function overlayClickListener(event) {
  if (event.target.classList.contains("overlay")) {
    closePopup();
  }
}

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
          <p id="validation-message"></p>
          <h2 id="response-message" style="display: none"></h2>
          <button id="copy-button" style="display: none;">Copy</button>
          
        </div>
      </div>
    </div>
  `;

  const body = document.querySelector("body");
  body.innerHTML += popUpCard;

  const validationMessage = document.getElementById ("validation-message");
  const checkboxContainer = document.getElementById("checkbox-container");
  const responseHead = document.getElementById("response-head");
  const responseDescription = document.getElementById("response-description");
  const formDescription = document.getElementById("form-description");
  const formHead = document.getElementById("form-head");
  const submitButton = document.getElementById("submit-button");
  const gdprCheckbox = document.getElementById("gdpr-checkbox");
  const responseMessage = document.getElementById("response-message");
  const copyButton = document.getElementById("copy-button");
  const popupForm = document.getElementById("popup-form");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!gdprCheckbox.checked || !popupForm.checkValidity()) {
      validationMessage.textContent =
        "Please accept GDPR and fill in valid data.";
      return;
    }

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const data = {
      email: email,
      phone: phone,
    };

    try {
      const response = await fetch(
        "https://opt-interview-projects.onrender.com/lead-collection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        const couponCode = responseData.coupon_code;
        responseMessage.textContent = couponCode;
        responseMessage.style.display = "block"
        checkboxContainer.style.display = "none";
        formDescription.style.display = "none";
        responseDescription.style.display = "block";
        responseHead.style.display = "block";
        formHead.style.display = "none";
        submitButton.style.display = "none";
        gdprCheckbox.style.display = "none";
        document.getElementById("email").style.display = "none";
        document.getElementById("phone").style.display = "none";
        copyButton.style.display = "block";
      } else {
        responseMessage.textContent = "Invalid data";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  copyButton.addEventListener("click", () => {
    const couponCode = responseMessage.textContent;
    navigator.clipboard.writeText(couponCode).then(() => {
      alert("Coupon code copied to clipboard: " + couponCode);
    });
  });

  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    closePopup();
  });

  // Reattach the overlay click listener
  document.addEventListener("click", overlayClickListener);

  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
      opacity: 1.2;
      backdrop-filter: blur(6px);
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

    * {
    margin: 0;
    padding: 0;
    font-family: "Poppins", sans-serif;
  }
  
  .popup {
    display: flex;
    flex-direction: column;
  }
  
  .left-side {
    width: 100%;
  }
  
  .picture {
    width: 100%;
    height: 17rem;
  }
  
  .right-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    text-align: center;
  }
  
  #form-head {
    margin: 10px 10px 10px 10px;
    width: 100%;
  }
  
  #response-head {
    margin: 10px 10px 10px 10px;
    width: 100%;
  }
  
  #form-description {
    margin: 0 10px 10px 10px;
    width: 100%;
  }
  
  #response-description {
    margin: 0 10px 10px 10px;
    width: 100%;
    font-size: 12px;
  }
  
  #email {
    margin-bottom: 10px;
    width: 100%;
  }
  
  #checkbox-container {
    display: flex;
    flex-direction: row;
  }
  
  #response-message {
    border: dashed gainsboro;
    width: 100%;
    margin: 10px;
  }
  
  #phone {
    margin-bottom: 10px;
    width: 100%;
  }
  
  #gdpr-checkbox {
    text-decoration: none;
    width: 10px;
  }
  
  .link {
    text-decoration: none;
    color: black;
    font-size: 10px;
    width: 100%;
  }
  
  #validation-message {
    margin-top: 10px;
  }
  
  #submit-button {
    margin-bottom: 10px;
    background-color: black;
    color: white;
    height: 30px;
  }
  
  #submit-button:hover {
    color: black;
    background-color: gainsboro;
  }
  
  #copy-button {
    margin: 10px 0 10px 0;
    background-color: black;
    color: white;
    height: 30px;
  }
  
  #copy-button:hover {
    color: black;
    background-color: gainsboro;
  }
  
  #popup-form {
    display: flex;
    flex-direction: column;
  }
  
  #close-button {
    width: 20px;
    margin-left: 95%;
    color: black;
  }
  
  @media screen and (min-width: 768px) {
    .popup {
      flex-direction: row;
    }
  }
  `;
  document.head.appendChild(styleElement);
}

function closePopup() {
  const popupContainer = document.querySelector(".popup-container");
  if (popupContainer) {
    popupContainer.remove();
  }

  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }

  document.removeEventListener("click", overlayClickListener);
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    closePopup();
  }
});
displayPopup();
