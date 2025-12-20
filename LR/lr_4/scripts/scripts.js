const token = 'e45636fa74f7a0';
const url = `https://ipinfo.io/json?token=${token}`

const elemIP = document.getElementById("ip")
const elemCity = document.getElementById("city")
const elemReg = document.getElementById("reg")
const elemCO = document.getElementById("co")
const elemOrg = document.getElementById("org")

fetch(url)
    .then(respone => {
        if (!respone.ok) {
            console.log("Ошибка")
        }
        return respone.json()
})
    .then(data => {
        elemIP.innerHTML += data.ip
        elemCity.innerHTML += data.city
        elemReg.innerHTML += data.region
        elemCO.innerHTML += data.country
        elemOrg.innerHTML += data.org
        console.log(data)
    })
