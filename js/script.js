const container = document.querySelector('.container');

function createCard(name, status, species, img, location) {
	const card = document.createElement('div');
	card.classList.add('card');

	const cardInfo = document.createElement('div');
	cardInfo.classList.add('card-info');

	const cardTitle = document.createElement('div');
	cardTitle.classList.add('title');
	const cardTitleH1 = document.createElement('h1');
	cardTitleH1.innerHTML = `${name}`;	//insert name
	cardTitle.append(cardTitleH1);

	const cardStatus = document.createElement('div');
	cardStatus.classList.add('status');
	const cardLiveStatus = document.createElement('div');
	cardLiveStatus.classList.add('live-status');

	const cardStatusP = document.createElement('p');
	const cardStatusPText = document.createTextNode(`${species} -- ${status}`);	// insert status
	if(status === 'Dead'){	// check status
		cardLiveStatus.classList.add('dead');
	}
	cardStatus.append(cardLiveStatus);
	cardStatusP.append(cardStatusPText);
	cardStatus.append(cardStatusP);
	cardTitle.append(cardStatus);
	cardInfo.append(cardTitle);

	const cardContent = document.createElement('div');
	cardContent.classList.add('content');
	const cardContentText = document.createTextNode(`${location}`);	// insert location
	cardContent.append(cardContentText);
	cardInfo.append(cardContent);

	card.append(cardInfo);

	const cardImage = document.createElement('div');
	cardImage.classList.add('card-image');
	const image = document.createElement('img');
	image.src = `${img}`;	//insert img
	image.alt = 'Some image';
	cardImage.append(image);
	card.append(cardImage);

	container.append(card); 	
}
async function getResponse(number){
	return fetch(`https://rickandmortyapi.com/api/character/${number}`);
}
async function start(...arg){
	arg.forEach(async(item) => {
		let response = await getResponse(item); 
		let data = await response.json();
		console.log(data);
		createCard(data.name, data.status, data.species, data.image, data.location.name);
	});	
}
start(1,2,4,6,10,34,3);


// фильтрация
let filter = document.querySelector('.form-container');
//console.log(filter);

filter.addEventListener('input', filterCard);

function filterCard(event){
	let formCard = document.querySelectorAll('.card');
	//console.log(formCard);
	formCard.forEach((item) => { // delete cards
		item.remove();
	});

	let link = `https://rickandmortyapi.com/api/character/`;
	if(event.target.id === 'male' || event.target.id === 'female'){
		link += `?gender=${event.target.id}`;
	} else if (event.target.id === 'alive' || event.target.id === 'dead'){
		link += `?status=${event.target.id}`;
	}
	async function getFileredCard(link){
		return fetch(link);
	}
	async function drawFilteredCards(...link){
		link.forEach(async(item) => {
			let responce = await getFileredCard(item);
			let data = await responce.json();
			console.log(data.results);
			data.results.forEach(async(elem) => {
				createCard(elem.name, elem.status, elem.species, elem.image, elem.location.name);
			});
		});
	}
	drawFilteredCards(link);
}