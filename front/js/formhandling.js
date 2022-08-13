function collectFormData() {
    const productForm = document.forms["productForm"];
    let formData = new FormData(productForm);
    // let productName = productForm.elements["productName"].value;
    // let productVolume = productForm.elements["productVolume"].value;
    // let productMaterial = productForm.elements["productMaterial"].value;
    // let productImage = productForm.elements["productImage"].value;
    // // !!! Remember about productId
    // const product = JSON.stringify({productName: productName, productVolume: productVolume, productMaterial: productMaterial, productImage: productImage});
    productForm.reset();
    return formData;
}

async function sendData() {
    await fetch ('http://localhost:3000/product', {
            method: 'POST',
            body: collectFormData()
        })
}

submitBtn.addEventListener ('click', (e) => {
    e.preventDefault();
    sendData();    
    // (async () => {
    //     const rawResponse = await fetch ('http://localhost:3000/product', {
    //         method: 'POST',
    //         // headers: {
    //         //     'Accept': 'application/json',
    //         //     'Content-Type': 'application/json'
    //         // },
    //         body: collectFormData()
    //     })

    //     // const data = await rawResponse.json();
    //     // console.log(data);

    //     // let newRaw = document.createElement("div");
    //     // newRaw.innerHTML = JSON.stringify(data);
    //     // document.querySelector(".dataContainer").appendChild(newRaw);
    // })();
    modalClose();
})