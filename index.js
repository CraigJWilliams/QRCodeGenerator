const urlInput = document.querySelector('.url-input')
const submitBtn = document.querySelector('.submit-btn')
const resetbtn = document.querySelector('.reset-btn')
const form = document.querySelector('.form')
const imgContainer = document.querySelector('.img-container')
const img = document.querySelector('.qr-code-img')
const colorPickers = document.querySelector('.color-picker')
const bgColor = document.querySelector('#bg-color')
const qrColor = document.querySelector('#qr-color')
const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/?'



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
        img.src = imageUrl;
        img.alt = `QR code for ${urlInput}`
        imgContainer.style.display = 'flex'
        submitBtn.style.display = 'none'
        resetbtn.style.display = 'block'
    } catch (err) {
        console.log(err)
    }
}

form.addEventListener('submit', (e) => {
    if (urlInput) {
        e.preventDefault()
        submitBtn.textContent = 'Generating...'
        setTimeout(() => {
            generateQRCode(e);
        }, 1000);
    }
});

colorPickers.addEventListener('change', (e) => {
    if (urlInput) {
        generateQRCode(e)
    }
})

resetbtn.addEventListener('click', (e) => {
    e.preventDefault()
    imgContainer.style.display = 'none'
    resetbtn.style.display = 'none'
    submitBtn.textContent = 'Generate QR Code'
    submitBtn.style.display = 'block'
    form.reset()
})


// to do
// 2. error handling, show errors in html when data cannot be fetched, only allow urls
// 3. connect download button and allow it to download to the users device
