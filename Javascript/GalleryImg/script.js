const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

const allImg = [...document.querySelectorAll('.image img')]
const galleryImg = document.querySelector('.gallery__image img')
const gallery = document.querySelector('.gallery')

let currentIndex = 0;

function transImg () {
    galleryImg.src = allImg[currentIndex].src;
    gallery.classList.remove('hide')
}

allImg.forEach(function(value , index) {
    allImg[index].addEventListener('click' ,function (e) {
        currentIndex = index;
        transImg()
    })
})

prev.addEventListener('click' , function () {
    if(currentIndex <= 0) {
        currentIndex = allImg.length - 1;
    }
    currentIndex--;
    transImg();
})

next.addEventListener('click' , function () {
    if(currentIndex >= allImg.length - 1) {
        currentIndex = 0;
    }
    currentIndex++;
    transImg();
})

gallery.addEventListener("click" , function (e) {
    if(e.target == e.currentTarget) {
        gallery.classList.add('hide')
    }
})