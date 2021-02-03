$(document).ready(() => {
  const colors = [
    "#B1D4E0",
    "#2E8BC0",
    "#0C2D48",
    "#145DA0",
    "#FF4500",
    "#FF8300",
    "#DF362D",
    "#B7AC44",
  ];

  const quotes = [
    {
      quote: "If you can dream it, you can achieve it.",
      author: "Zig Ziglar",
    },
    {
      quote: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      quote:
        "Build your own dreams, or someone else will hire you to build theirs.",
      author: "Farrah Gray",
    },
    {
      quote:
        "Life isn’t about getting and having, it’s about giving and being.",
      author: "Kevin Kruse",
    },
    {
      quote: "A person who never made a mistake never tried anything new.",
      author: "Albert Einstein",
    },
    {
      quote: "By failing to prepare, you are preparing to fail.",
      author: "Benjamin Franklin",
    },
    {
      quote:
        "Opportunity does not knock, it presents itself when you beat down the door.",
      author: "Kyle Chandler",
    },
    {
      quote: 'Nothing is impossible, the word itself says "I\'m possible"!',
      author: "Audrey Hepburn",
    },
  ];

  function handleClick() {
    // get random index for the mainColor
    const colorIndex = Math.round(Math.random() * (colors.length - 1));

    // same for quotes
    const quoteIndex = Math.round(Math.random() * (quotes.length - 1));

    $("#text").css("color", "white");
    $("#author").css("color", "white");
    $(".fa-quote-left").css("color", "white");

    setTimeout(() => {
      // put the data into the page
      $("#text").text(quotes[quoteIndex].quote);
      $("#author").text(`- ${quotes[quoteIndex].author}`);

      // change the mainColor of the website
      $(".container-fluid").css("background-color", colors[colorIndex]);
      $(".btn").css("background-color", colors[colorIndex]);
      $("#text").css("color", colors[colorIndex]);
      $("#author").css("color", colors[colorIndex]);
      $(".fa-quote-left").css("color", colors[colorIndex]);
    }, 300);

    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent(
          '"' + quotes[quoteIndex].quote + '" ' + quotes[quoteIndex].author
        )
    );

    $("#tumblr-quote").attr(
      "href",
      "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        encodeURIComponent(quotes[quoteIndex].author) +
        "&content=" +
        encodeURIComponent(quotes[quoteIndex].quote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
    );
  }

  $("#new-quote").on("click", handleClick);
  $("#new-quote").click();
});
