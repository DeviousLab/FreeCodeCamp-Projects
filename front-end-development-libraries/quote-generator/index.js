const quoteText = document.querySelector('#text');
const quoteButton = document.querySelector('button');
const quoteAuthor = document.querySelector('#author');
const quoteTweet = document.querySelector('#tweet-quote');

function getQuotes() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      quoteText.innerHTML = `"${data.content}"`;
      quoteAuthor.innerHTML = `- ${data.author}`;
    });
}
getQuotes();

quoteButton.addEventListener('click', getQuotes);

quoteTweet.addEventListener('click', () => {
  const quote = quoteText.innerHTML;
  const author = quoteAuthor.innerHTML;
  window.open(`https://twitter.com/intent/tweet?text=${quote} ${author}`);
});

