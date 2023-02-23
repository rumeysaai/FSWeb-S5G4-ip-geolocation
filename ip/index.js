import axios from 'axios'; //axios import buraya gelecek

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
	(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
	https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/





/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/


//kodlar buraya gelecek

const generateCardClass = (objct) => {
	const cardDiv = document.createElement("div");
	cardDiv.classList.add("card");

	const img = document.createElement("img");
	const cardInfoDiv = document.createElement("div");
	const ip = document.createElement("h3");
	const ulkeP = document.createElement("p");
	const enlemBoylamP = document.createElement("p");
	const sehirP = document.createElement("p");
	const saatDilimi = document.createElement("p");
	const paraBirimi = document.createElement("p");
	const ispK = document.createElement("p");

	cardInfoDiv.classList.add("card-info");
	ip.classList.add("ip");
	ulkeP.classList.add("ulke");

	cardInfoDiv.appendChild(ip);
	cardInfoDiv.appendChild(ulkeP);
	cardInfoDiv.appendChild(enlemBoylamP);
	cardInfoDiv.appendChild(sehirP);
	cardInfoDiv.appendChild(saatDilimi);
	cardInfoDiv.appendChild(paraBirimi);
	cardInfoDiv.appendChild(ispK);
	cardDiv.appendChild(img);
	cardDiv.appendChild(cardInfoDiv);

	img.src = objct?.ülkebayrağı;
	ip.textContent = `${objct?.sorgu};`;
	ulkeP.textContent = `${objct.ülke} (${objct?.ülkeKodu})`;
	enlemBoylamP.textContent = `Enlem: ${objct?.enlem} Boylam: ${objct?.boylam}`;
	sehirP.textContent = `Şehir: ${objct?.şehir}`;
	saatDilimi.textContent = `Saat Dilimi: ${objct?.saatdilimi}`;
	paraBirimi.textContent = `Para Birimi: ${objct?.parabirimi}`;
	ispK.textContent = `ISP: ${objct.isp}`;

	return cardDiv;
}

const cardContainer = document.querySelector(".cards");



function getApiDetails() {
	
	let apiRes = null;

	axios.get("https://apis.ergineer.com/ipgeoapi/176.33.67.173")
		.then((res) => {
			apiRes = res.data
			cardContainer.append(generateCardClass(apiRes));
			//return myIp;
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log("myIp", apiRes);
		});
}

console.log( getApiDetails());

const myIp = async function() {
	await ipAdresimiAl();
	axios.get("https://apis.ergineer.com/ipgeoapi/"+benimIP)
		.then((response) => {
			cardContainer.appendChild(generateCardClass(response.data));
		})
		.catch((error) => {
			console.log("Error: " + error);
		});
};
myIp();