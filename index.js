document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/films/1')
    .then(response => response.json())
    .then(film => {
        const title = film.title;
        const poster = film.poster;
        const runtime = film.runtime;
        const showtime = film.showtime;
        const ticketsSold = film.tickets_sold;
        const capacity = film.capacity;
        const availableTickets = capacity - ticketsSold;
        
    
        const filmTitle = document.getElementById('film-title');
        filmTitle.textContent = title;

        const filmPoster = document.getElementById('film-poster');
        filmPoster.src = poster;

        const filmRuntime = document.getElementById('film-runtime');
        filmRuntime.textContent = `Runtime: ${runtime} minutes`;

        const filmShowtime = document.getElementById('film-showtime');
        filmShowtime.textContent = `Showtime: ${showtime}`;

        const filmAvailableTickets = document.getElementById('available-tickets');
        filmAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;

    });

        fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(movies => {
   
    const filmsMenu = document.getElementById('films');

    movies.forEach(movie => {
        const id = movie.id;
        const title = movie.title;
      const listItem = document.createElement('li');
      listItem.textContent = title;
      listItem.classList.add('film', 'item');
      listItem.addEventListener('click', () => {
        displayMovieDetails(id);
      });
      filmsMenu.appendChild(listItem);
    });
  })
  function displayMovieDetails(movieId) {
    fetch(`/films/${movieId}`)
    .then(response => response.json())
    .then(movie => {
      const { poster, title, runtime, showtime, tickets_sold, capacity } = movie;
      const availableTickets = capacity - tickets_sold;

      const moviePosterElement = document.getElementById('movie-poster');
      const movieTitleElement = document.getElementById('movie-title');
      const movieRuntimeElement = document.getElementById('movie-runtime');
      const movieShowtimeElement = document.getElementById('movie-showtime');
      const ticketsSoldElement = document.getElementById('tickets-sold');
      const availableTicketsElement = document.getElementById('available-tickets');

      moviePosterElement.src = poster;
      movieTitleElement.textContent = title;
      movieRuntimeElement.textContent = `Runtime${runtime} minutes`;
      movieShowtimeElement.textContent = `Showtime: ${showtime}`;
      ticketsSoldElement.textContent = `Tickets Sold: ${tickets_sold}`;
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    })
  }

const buyTicketButton = document.getElementById('buy-ticket');

buyTicketButton.addEventListener('click', () => {
  const movieId = 1; // Replace with the actual movie ID
  fetch(`/films/${movieId}`)
    .then(response => response.json())
    .then(movie => {
      const { tickets_sold, capacity } = movie;
      if (tickets_sold < capacity) {
        const ticketsSoldElement = document.getElementById('tickets-sold');
        const availableTicketsElement = document.getElementById('available-tickets');

        const updatedTicketsSold = tickets_sold + 1;
        const updatedAvailableTickets = capacity - updatedTicketsSold;

        ticketsSoldElement.textContent = `Tickets Sold: ${updatedTicketsSold}`;
        availableTicketsElement.textContent = `Available Tickets: ${updatedAvailableTickets}`;
      } else {
        alert('Sorry, the showing is sold out.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

});
