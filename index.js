const userInput = document.querySelector("#input");
const btn = document.querySelector("#btn");
const mainContainer = document.querySelector(".main-container");
const imageGallery = document.querySelector(".image-gallery");
const moreImage = document.querySelector(".more-image");
const moreBtn = document.querySelector(".more-image button");
const resetBtn = document.querySelector("#reset");
const arrow = document.querySelector(".arrow");

let page = 1;

const key = "qjGFtcZvVQ-bzgoKY3cbJYJibLj1-dQjSf1q8cpUf-4"
const api_key = `https://api.unsplash.com/search/photos?page${page}&query=${userInput}&client_id=${key}`;

async function fetchData(){
   console.log(page)
   const search = userInput.value;
   const response  = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${key}`);
   const data = await response.json();
   if(page === 1){
      imageGallery.innerHTML=""
   }
   moreImage.style.display = "none";
   arrow.style.display = "none";

   data.results.forEach((img,idx)=>{
       displayImage(img.urls.regular);
   })
   moreImage.style.display = "flex";
   arrow.style.display = "block";
   console.log(data.results);
}

function displayImage(url){

   const imageWrapper = document.createElement("div");
   imageWrapper.classList.add("image-wrapper")

   const img = document.createElement("img");
   img.src = url;

   const overlay = document.createElement("div");
   overlay.classList.add("overlay")

   const buttonGroup = document.createElement("div");
   buttonGroup.classList.add("button-group")

   const favoriteBtn = document.createElement("span");
   favoriteBtn.innerText="favorite"
   favoriteBtn.classList.add("material-symbols-outlined","favorite-button");

   const addBtn = document.createElement("span");
    addBtn.innerText ="add";
   addBtn.classList.add("material-symbols-outlined","add-button");

   

   const downloadImg = document.createElement("span");
   downloadImg.innerText = "download"
   downloadImg.classList.add("material-symbols-outlined","download-link");
   // downloadImg.addEventListener("click",imageDownload);


   buttonGroup.append(favoriteBtn,addBtn);
   overlay.append(buttonGroup,downloadImg);
   imageWrapper.append(img,overlay);
   imageGallery.append(imageWrapper);
   mainContainer.append(imageGallery);



}

btn.addEventListener("click",()=>{
    fetchData()
})


moreBtn.addEventListener("click",()=>{
   page = page + 1;
   fetchData();
})

resetBtn.addEventListener("click",()=>{
    userInput.value = "";
    imageGallery.innerHTML="";
    moreImage.style.display = "none";
    arrow.style.display = "none";
})


