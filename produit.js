const quantites = document.querySelectorAll(".quantite");

function calculerTotal(){

let total = 0;
let panierHTML = "";

quantites.forEach(input => {

let qte = parseInt(input.value) || 0;
let prix = parseInt(input.dataset.prix) || 0;
let produit = input.closest(".product").querySelector("b").innerText;

if(qte > 0){

let sousTotal = prix * qte;

total += sousTotal;

panierHTML += produit + " x " + qte + " = " + sousTotal + " FCFA <br>";

}

});

document.getElementById("Panier").innerHTML = panierHTML;
document.getElementById("Total").innerText = total;

}

quantites.forEach(input => {

input.addEventListener("input", calculerTotal);

});


function envoyerCommande(){

let message = "Bonjour! Je veux commander : %0A";

quantites.forEach(input => {

let qte = parseInt(input.value) || 0;
let prix = parseInt(input.dataset.prix);
let produit = input.closest(".product").querySelector("b").innerText;

if(qte > 0){

message += produit + " x " + qte + " = " + (prix*qte) + " FCFA %0A";

}

});

let total = document.getElementById("Total").innerText;

message += "%0ATotal : " + total + " FCFA";

let numero = "22369613683";

window.open(`https://wa.me/${numero}?text=${message}`);
}
 function ouvrirPaiement(){
    document.getElementById("paiementBox").style.display="block";
 }

 function confirmerPaiement(){
    let numeroClient =
    document.getElementById("numeroClient").value;
    let methode =
    document.getElementById("methode").value;
    let message= "Commande payée %0A";
    message += "Mode : " +methode + "%0A";
    message += "Client :"+numeroClient +"%0A%0A";
    
    quantites.forEach(input =>{
        let qte = parseInt(input.value) || 0;
        let prix = parseInt(input.dataset.prix);
        let produit = 
        input.closest(".product").querySelector("b").innerText;
        if(qte > 0){
            message += produit + "X" + qte + "=" + (prix*qte) + "FCFA %0A";
        }
    })
let total =
document.getElementById("Total").innerText;
message += "%0ATotal payé :" + total + "FCFA"
window.open(`https://wa.me/22369613683?text=${message}`);
 }
 
 let stories = [];
let isAdmin = false;

function verifierAdmin(){
    let pass =
    document.getElementById("adminPass").value;
    if(pass ==="1234"){
        isAdmin = true;
        alert("Admin connecté");
        document.querySelector("#media").style.display= "block";
        document.querySelector("#caption").style.display= "block";
        document.querySelector("#duree").style.display= "block";
    }else{
        alert("mot de passe incorect");
    }
}

function ajouterStory(){
    if(!isAdmin){
        alert("accès refusé");
        return;
    }
    let file = 
    document.getElementById("media").files[0];
    let caption = document.getElementById("caption").value;
    let duree = parseInt(document.getElementById("duree").value);
    if(!file){
        alert("choisir un fichier");
        return;
    }
    let url = URL.createObjectURL(file);
    let story = {
        url: url,
        type : file.type.startsWith("video") ? "video" : "image",
        caption : caption,
        fin : Date.now() + duree *1000
    };
    stories.push(story);
    afficherStories();
}

function afficherStories(){
    let container =
    document.getElementById("stories");
    container.innerHTML= "";
    stories.forEach((story, index)=>{
        if (Date.now() > story.fin) return;
        let div = document.createElement("div");div.className = "story";
        let media;
        if(story.type === "video"){
            media = document.createElement("video");media.src = story.url;}else{
             media = document.createElement("img"); media.src= story.url; 
            }
            div.appendChild(media);
            div.onclick = () => voirStory(index);
            container.appendChild(div);
    });
}

function voirStory(index){
    let story= stories[index];
    let viewer=
    document.createElement("div");
    viewer.className= "viewer";
    let media;
    if(story.type === "video"){
        media= document.createElement("video");
        media.src = story.url;
        media.controls = true;
        media.autoplay = true;
    }else{
        media = document.createElement("img");
        media.src = story.url;
    }
    let caption =
    document.createElement("div");
    caption.className = "caption";
    caption.innerText = story.caption;

    viewer.onclick = () => viewer.remove();
    viewer.appendChild(media);
    viewer.appendChild(caption);
    document.body.appendChild(viewer);

    
    setTimeout(()=>{
    viewer.remove();
    let nextIndex = index + 1;
    if (nextIndex < stories.length){
        voirStory(nextIndex);
    }
 }, 5000);
 viewer.onclick = () => {
    viewer.remove();
    let nextIndex = index + 1;
    if(nextIndex < stories.length){
        voirStory(nextIndex);
    }
 };
}

setInterval(afficherStories, 1000);

function loginAdmin(){
    let pass= prompt("Mot de passe admin");
    if(pass === "1234"){
        isAdmin = true;
        alert("Mode activé");
        document.querySelector(".add-story").style.display= "block"
    }else{
        alert("Mot de passe incorrect");
    }
}