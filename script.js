const API_KEY="55e544e75a134b40ac96c39b5b4582e0";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("India"));

async function fetchNews(query){

const res= await fetch(`${url}${query}&apikey=${API_KEY}`);

const data=await res.json();

bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card')
    cardsContainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
       fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
        
    });
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
   timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name}. ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
   window.open(article.url,"_blank");
    });
}

let selectNav=null
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    selectNav?.classList.remove("active");
    selectNav=navItem;
    selectNav.classList.add("active");
}


const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{

    const query=searchText.value;
    if(!query) return;
    
    fetchNews(query);

    selectNav?.classList.remove("active");

    currentselectNav=null;

})

// relode page
function reload(){
    window.location.reload();
}


 // humberger for small device
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

