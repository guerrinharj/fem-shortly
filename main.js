const menuBurgerTag = document.querySelector('.menu-burger-area')
const mobileMenuTag = document.querySelector('.mobile-menu-area')

menuBurgerTag.addEventListener('click', () => {
    mobileMenuTag.classList.toggle('mobile-menu-area-visible')
})

///////////////////////////////////////

const inputTag = document.querySelector('.the-input')
const shortenButton = document.querySelector('#shorten-button')
const errorArea = document.querySelector('.error-area')
const resultsArea = document.querySelector('.results-area-container')



createResult = (old, nu) => {
    const resultDIV = document.createElement('div')
    resultDIV.setAttribute("class", "result")
    resultsArea.appendChild(resultDIV)
    

    const resultContainerDIV = document.createElement('div')
    resultContainerDIV.setAttribute("class", "result-container")
    resultDIV.appendChild(resultContainerDIV)

    
    const oldLink = document.createElement('div')
    oldLink.setAttribute("class", "old-link")
    resultContainerDIV.appendChild(oldLink)
    oldLink.innerHTML = old

    const newLinkArea = document.createElement('div')
    newLinkArea.setAttribute("class", "new-link")
    resultContainerDIV.appendChild(newLinkArea)
    newLinkArea.innerHTML = nu
    

    const buttonAreaTag = document.createElement('div')
    buttonAreaTag.setAttribute("class", "button-result-area")
    resultContainerDIV.appendChild(buttonAreaTag)

    const buttonTag = document.createElement('button')
    buttonTag.setAttribute("id", "button-result")
    buttonAreaTag.appendChild(buttonTag)
    buttonTag.innerHTML = "Copy"


    buttonTag.addEventListener('click', () => {
        const linkText = newLinkArea.innerHTML
        navigator.clipboard.writeText(linkText);
        buttonTag.classList.add('button-clicked')
        buttonTag.innerHTML = "Copied!"
       

        setInterval(() => { 
            buttonTag.classList.remove('button-clicked')
            buttonTag.innerHTML = "Copy"
        }, 4000);


    })
}


const theResult = () =>  {

    errorArea.classList.remove('error-area-visible')
    inputTag.classList.remove('wrong-input')
    const inputValue = inputTag.value

    if (inputValue === "") {
        inputTag.classList.add('wrong-input')
        errorArea.classList.add('error-area-visible')
    } 

    async function myFetch() { 

        try {
            const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
            const responseJson = await response.json()
            const data = responseJson.result
            const shortLink = data.short_link
            const oldLink = data.original_link

            createResult(oldLink, shortLink)
          
        }
        catch {
            inputTag.classList.add('wrong-input')
            errorArea.classList.add('error-area-visible')
           }
        }

        myFetch()
    }



shortenButton.addEventListener('click', () => {

    theResult()
  
})

document.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        theResult()
    }
})