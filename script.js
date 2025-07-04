const radios = document.querySelectorAll('input[type="radio"]');
let Selected = {};

function updateTotal() {
  let total = 0;
  const groups = ['option1', 'option2', 'option3'];
  groups.forEach(group => {
    const selected = document.querySelector(`input[name="${group}"]:checked`);
    if (selected) {
      total += parseInt(selected.dataset.cost);
    }
  });
  document.getElementById('total').textContent = `Total: $${total}.00 USD`;
}

radios.forEach(radio => {
  radio.addEventListener('click', function (e) {
    const name = this.name;

    if (Selected[name] === this) {
      this.checked = false;
      Selected[name] = null;
      deactivateAllBoxes();
    } else {
      Selected[name] = this;
      activateBox(this.closest('.box'));
    }

    updateTotal();
  });
});

const boxes = document.querySelectorAll('.box');

function activateBox(box) {
  boxes.forEach(b => b.classList.remove('active'));
  box.classList.add('active');
}

function deactivateAllBoxes() {
  boxes.forEach(b => b.classList.remove('active'));
}

boxes.forEach(box => {
  box.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() === 'select' || e.target.type === 'radio') return;

    const radio = box.querySelector('input[type="radio"]');
    if (radio) {
      if (radio.checked) {
        radio.checked = false;
        Selected[radio.name] = null;
        deactivateAllBoxes();
      } else {
        radio.checked = true;
        Selected[radio.name] = radio;
        activateBox(box);
      }
    }

    updateTotal();
  });
});

function message() {
  const container = document.querySelector(".container");
  let displayMessage = document.getElementById("Message");

  if (!displayMessage) {
    const msg = document.createElement("div");
    msg.id = "Message";
    msg.className = "cart-message";
    msg.textContent = "Successfully added to cart !!!";
    container.appendChild(msg);
  } else {
    displayMessage.style.display = "block";
  }

  setTimeout(() => {
    const msg = document.getElementById("Message");
    if (msg) msg.style.display = "none";
  }, 2000);
}

updateTotal();