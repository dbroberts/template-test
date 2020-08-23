
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//Get Quote from API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere2.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.legth > 50) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
    } catch (error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

// On load
getQuote();
