// toggle button
const navMenu = document.getElementById("nav-menu")
const navlink = document.getElementById(".nav-link")
const menutag = document.getElementById("menutag")

menutag.addEventListener("click", () => {
    navMenu.classList.toggle("left-[0]")
    menutag.classList.toggle('ri-close-large-line')
})

navlink.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.toggle("left-[0]")
        menutag.classList.toggle('ri-close-large-line')
    })
})