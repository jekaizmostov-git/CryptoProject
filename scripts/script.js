//get DOM elements
const cryptoList = document.getElementById('crypto-list')
const currencySelect = document.getElementById('currency-select')
const refreshBtn = document.getElementById('refresh-btn')

//main function for load data from CoinGecko
async function fetchCryptoData(currency = "usd"){
	try{
		const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
		const data = await response.json()
		return data
	}catch(error){
		console.error('Error loading data')
		return []
	}
}

function displayCryptoData(data){
	cryptoList.innerHTML = ''
	data.forEach(crypto => {
		const cryptoItem = document.createElement('div')
		cryptoItem.classList = 'crypto-item'
		cryptoItem.innerHTML = `
			<span>${crypto.name} (${crypto.symbol.toUpperCase()})</span>
			<span>>${crypto.current_price} ${currencySelect.value.toUpperCase()}</span>
		`;
		cryptoList.appendChild(cryptoItem)
	});
}

//Updating data of change currency or btn click
async function updateData() {
	const currency = currencySelect.value
	const data = await fetchCryptoData(currency)
	displayCryptoData(data)
}

//initialize
updateData()

currencySelect.addEventListener('click', updateData)
refreshBtn.addEventListener('click', updateData)

fetchCryptoData().then(data => console.log(data))