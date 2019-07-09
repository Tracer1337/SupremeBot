// https://www.supremenewyork.com/shop/all/accessories
const products = document.getElementsByTagName("article")
const result = []
Array.from(products).forEach(e => {
	const $ = s => e.querySelector(".inner-article "+s).innerText
	const name = $("h1")
	const color = $("p")
	result.push({name, color})
})
console.table(result)


const getProductByNameAndColor = (name, color) => {
	const test = (element, selector, query) => element.querySelector(".inner-article "+selector).innerText.toLowerCase().includes(query.toLowerCase())
	Array.from(products).find(e => test(e, "h1", name) && test(e, "p", color))
}

const getProductLink = article => article.querySelector(".inner-article a").href
