// Toggle mobile menu
const menuButton = document.getElementById('menu-button');
const navUl = document.querySelector('#main-nav ul');

menuButton.addEventListener('click', () => {
    navUl.classList.toggle('open');
});

// Footer dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

// Fetch JSON data and display members (Async/Await Criterion)
const membersURL = 'data/members.json';
const membersContainer = document.getElementById('members-container');

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching members data:", error);
    }
}

const displayMembers = (members) => {
    membersContainer.innerHTML = ''; // Limpa antes de popular
    
    members.forEach((member) => {
        let card = document.createElement('section');
        
        let logo = document.createElement('img');
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        
        let name = document.createElement('h3');
        name.textContent = member.name;
        
        let address = document.createElement('p');
        address.textContent = member.address;
        
        let phone = document.createElement('p');
        phone.textContent = member.phone;
        
        let website = document.createElement('a');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.textContent = "Website";
        
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        
        membersContainer.appendChild(card);
    });
}

// Chamar a função para carregar os dados
getMembers();

// Grid and List View Toggle Logic
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
    
    gridBtn.classList.add('active-view');
    listBtn.classList.remove('active-view');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
    
    listBtn.classList.add('active-view');
    gridBtn.classList.remove('active-view');
});