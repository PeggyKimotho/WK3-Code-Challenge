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
      const list = document.createElement('li');
      list.textContent = title;
      list.addEventListener('click', () => {
        displayMovieDetails(id);
      });
      filmsMenu.appendChild(list);
    });
  })
  function displayMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
    .then(response => response.json())
    .then(movie => {
      const { poster, title, runtime, showtime, tickets_sold, capacity } = movie;
      const availableTickets = capacity - tickets_sold;

      const moviePosterElement = document.getElementById('film-poster');
      const movieTitleElement = document.getElementById('film-title');
      const movieRuntimeElement = document.getElementById('film-runtime');
      const movieShowtimeElement = document.getElementById('film-showtime');
      const ticketsSoldElement = document.getElementById('tickets-sold');
      const availableTicketsElement = document.getElementById('available-tickets');
      const buyTicketButton = document.getElementById('buy-ticket');

      moviePosterElement.src = poster;
      movieTitleElement.textContent = title;
      movieRuntimeElement.textContent = `Runtime: ${runtime} minutes`;
      movieShowtimeElement.textContent = `Showtime: ${showtime}`;
      ticketsSoldElement.textContent = `Tickets Sold: ${tickets_sold}`;
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
      
      buyTicketButton.addEventListener('click', () => {
        

        if (availableTickets > 0) {
          const updatedTicketsSold = tickets_sold + 1;
          const updatedAvailableTickets = availableTickets - 1;
          ticketsSoldElement.textContent = `Tickets Sold: ${updatedTicketsSold}`;
          availableTicketsElement.textContent = `Available Tickets: ${updatedAvailableTickets}`;
        } else {
          alert('Sorry, the showing is sold out.');
        }
      });
    })
    }

});
