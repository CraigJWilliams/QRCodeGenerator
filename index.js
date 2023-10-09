const urlInput = document.querySelector('.url-input')
const submitBtn = document.querySelector('.submit-btn')
const resetbtn = document.querySelector('.reset-btn')
const form = document.querySelector('.form')
const imgContainer = document.querySelector('.img-container')
const img = document.querySelector('.qr-code-img')
const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/?'



async function generateQRCode(e) {
    const bgColor = document.querySelector('#bg-color').value.slice(1)
    const qrColor = document.querySelector('#qr-color').value.slice(1)
    try {
        const res = await fetch(`${baseUrl}data=${urlInput.value}&color=${qrColor}&bgcolor=${bgColor}`)
        if (!res.ok) {
            throw new Error('failed to fetch data')
        }
        const blob = await res.blob()
        const imageUrl = URL.createObjectURL(blob)
        img.src = imageUrl;
        imgContainer.style.display = 'flex'
        submitBtn.style.display = 'none'
        resetbtn.style.display = 'block'
    } catch (err) {
        console.log(err)
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('generating text updated')
    submitBtn.textContent = 'Generating...'
    setTimeout(() => {
        generateQRCode(e);
    }, 1000);
});

form.addEventListener('change', (e) => {
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
// 1. fix set timeout so button text is updated
// 2. error handling, show errors in html when data cannot be fetched, only allow urls
// 3. connect download button and allow it to download to the users device
// 4. update img alt tags with url name