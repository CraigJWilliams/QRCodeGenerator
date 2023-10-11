const urlInput = document.querySelector('.url-input')
const submitBtn = document.querySelector('.submit-btn')
const downloadBtn = document.querySelector('.download-btn')
const resetbtn = document.querySelector('.reset-btn')
const form = document.querySelector('.form')
const imgContainer = document.querySelector('.img-container')
const img = document.querySelector('.qr-code-img')
const colorPickers = document.querySelectorAll('.color-picker')
const bgColor = document.querySelector('#bg-color')
const qrColor = document.querySelector('#qr-color')
const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/?'


// fetch qr code using user input
async function generateQRCode(e) {
    const bgColorValue = document.querySelector('#bg-color').value.slice(1)
    const qrColorValue = document.querySelector('#qr-color').value.slice(1)
    try {
        const res = await fetch(`${baseUrl}data=${urlInput.value}&color=${qrColorValue}&bgcolor=${bgColorValue}`)
        if (!res.ok) {
            throw new Error('failed to fetch data')
        }
        const blob = await res.blob()
        const imageUrl = URL.createObjectURL(blob)
        removeError()
        showQrcode(imageUrl)
    } catch (err) {
        showError(err)
    }
}

// update the DOM with the generated qr code
const showQrcode = (imageUrl) => {
    // update img src and alt tags
    img.src = imageUrl;
    img.alt = `QR code for ${urlInput}`
    // display the img container and reset button and hide the submit btn
    imgContainer.style.display = 'flex'
    submitBtn.style.display = 'none'
    resetbtn.style.display = 'block'
}

// generate qr code when form is submitted and give a 1 second wait 
form.addEventListener('submit', (e) => {
    if (urlInput) {
        e.preventDefault()
        submitBtn.style.backgroundColor = '#2596be'
        submitBtn.style.color = 'var(--white)'
        submitBtn.textContent = 'Generating...'
        setTimeout(() => {
            generateQRCode(e);
        }, 1000);
    }
});

// show error in html 
const showError = (err) => {
    const errorText = document.createElement('p')
    errorText.classList.add('error-message')
    errorText.textContent = err
    form.appendChild(errorText).style.color = 'red'
}

// clear error if one exists and the code is successfully run
const removeError = () => {
    const errorText = form.querySelector('.error-message');
    if (errorText) {
        errorText.parentNode.removeChild(errorText);
    }
}

// update the generated qr code color when color is changed
colorPickers.forEach((picker) => {
    picker.addEventListener('change', (e) => {
        if (urlInput) {
            generateQRCode(e);
        }
    });
});

// reset the generator and clear the form when btn is clicked
resetbtn.addEventListener('click', (e) => {
    e.preventDefault()
    imgContainer.style.display = 'none'
    resetbtn.style.display = 'none'
    submitBtn.textContent = 'Generate QR Code'
    submitBtn.style.backgroundColor = '#15d798'
    submitBtn.style.color = 'var(--black)'
    submitBtn.style.display = 'block'
    form.reset()
})

// download the image when the user requests
downloadBtn.addEventListener('click', () => {
    downloadBtn.download = `${urlInput.value.slice(7)} QR Code.png`
    downloadBtn.href = img.src
})