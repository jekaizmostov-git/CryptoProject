const URL = 'https://open.er-api.com/v6/latest/'
const BASE_CURRENCY = 'USD'

const COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"


//get DOM elements
const cryptoList = document.getElementById('crypto-list')
const currencySelect = document.getElementById('currency-select')
const refreshBtn = document.getElementById('refresh-btn')
const amountOfMoney = document.querySelector('.input_amount')

//main function for load data from CoinGecko
async function fetchCryptoData(){
	try{
		const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
		const data = await response.json()
		return data
	}catch(error){
		console.error('Error loading data')
		return []
	}
}

//get ANY currency rate
async function getAnyCurrencyRate(currency){
	try{	
		const response = await fetch(URL + BASE_CURRENCY)
		const data = await response.json()
		return data.rates[currency.toUpperCase()]  
	} catch(error){
		console.error("Currency rate unable to load")
		return []
	}
	
}


function displayCryptoData(data, coefficient){
	cryptoList.innerHTML = ''
	data.forEach(crypto => {
		const cryptoItem = document.createElement('div')
		cryptoItem.classList = 'crypto-item'
		cryptoItem.innerHTML = `
			<span>${amountOfMoney.value} ${currencySelect.value.toUpperCase()}</span>
			<span>${(amountOfMoney.value / (crypto.current_price * coefficient)).toFixed(4)} ${crypto.symbol.toUpperCase()} (${crypto.name})</span>
		`
		cryptoList.appendChild(cryptoItem)
	});
}

//Updating data of change currency or btn click
async function updateData() {
	const currency = currencySelect.value
	const coefficient = await getAnyCurrencyRate(currency)
	const data = await fetchCryptoData()

	displayCryptoData(data, coefficient)
}

//initialize
updateData()

currencySelect.addEventListener('click', updateData)
refreshBtn.addEventListener('click', updateData)
amountOfMoney.addEventListener('input', updateData)