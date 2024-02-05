// let arr = [];

// fetch("http://localhost:3000/data/")
//   .then((res) => res.json())
//   .then((data) => {
//     arr = data;
//     console.log(arr);
//     printData();
//     $(".owl-carousel").owlCarousel({
//       margin: 10,
//       dots: true,
//       loop: true,
//       responsive: {
//         0: {
//           items: 1,
//         },
//         600: {
//           items: 2,
//         },
//         1000: {
//           items: 3,
//         },
//       },
//       autoplay: true,
//       autoplaySpeed: 1000,
//       autoplayTimeout: 3000,
//     });
//   });

// const printData = () => {
//   const carouselContainer = document.querySelector('.owl-carousel');
//   arr.forEach(element => {
//     carouselContainer.innerHTML += `
//       <div class="cards">
//         <div class="img">
//           <img src="${element.image}" alt="${element.name}" />
//         </div>
//         <h4>${element.name}</h4>
//         <div class="star">
//           <i class="bi bi-star-fill"></i>
//           <p>${element.rating}</p>
//         </div>
//       </div>
//     `;
//   });
// };


// flipping card
$( function() {

    $('.cards button').click( function( event ) {
      $( event.currentTarget ).toggleClass('flipped');
    });
    
  });