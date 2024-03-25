const loadData = async (SearchText = 'iphone', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`)
  const data = await res.json();
  const phones = data.data;
  displayData(phones, isShowAll);
}

const displayData = (phones, isShowAll) => {
  const container = document.getElementById('dynamic-data-container');
  container.textContent = '';

  const showAllContainer = document.getElementById('showAll-container');

  if (phones.length > 15 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden')
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    const { phone_name, image, slug } = phone;
    const div = document.createElement('div');
    div.classList = ` bg-white border border-gray-200 rounded-lg shadow`;
    div.innerHTML = `
    <a href="#">
    <img
      class="p-8 rounded-t-lg"
      src="${image}"
      alt="product image"
    />
    </a>
    <div class="px-5 pb-5">
    <a href="#">
      <h5
        class="text-xl font-semibold tracking-tight text-gray-900"
      >
        ${phone_name}
      </h5>
      <p>${slug}</p>
    </a>
    <div>
      <span class="text-3xl font-bold text-gray-900"
        >$599</span
      >
      <a
        onclick="loadPhoneDetails('${slug}')"
        data-modal-target="static-modal"
        data-modal-toggle="static-modal"
        id = "showDetailsBtn"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 block mt-3 cursor-pointer"
        >Show Details</a
      >
    </div>
  </div>
    `
    container.appendChild(div);
  })
  loader(false);
}

const loadPhoneDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const { image, name, slug, releaseDate, brand
  } = phone;
  const { storage, displaySize, chipSet, memory, } = phone.mainFeatures;
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
              <img src="${image}" alt="phone-photo" />
              <h1 class='text-2xl font-bold'>${name}</h1>
              <p>
                <span class="text-xl font-semibold">Storage: </span>
                ${storage} <br>
                <span class="text-xl font-semibold">Display Size:</span>
                ${displaySize} <br>
                <span class="text-xl font-semibold">Chipset:</span>
                ${chipSet} <br>
                <span class="text-xl font-semibold">Memory:</span>
                ${memory} <br>
                <span class="text-xl font-semibold">Slug:</span>
                ${slug} <br>
                <span class="text-xl font-semibold">Release date:</span>
                ${releaseDate} <br>
                <span class="text-xl font-semibold">Brand:</span>
                ${brand} 
              </p>
  `

}


const handleSearch = (isShowAll) => {
  loader(true)
  const searchField = document.getElementById('input-field');
  const inputText = searchField.value;

  loadData(inputText, isShowAll);
}

const loader = (status) => {
  const loaderSection = document.getElementById('loader-container');
  if (!status) {
    loaderSection.classList.add('hidden');
  }
  else {
    loaderSection.classList.remove('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true);
}

loadData();