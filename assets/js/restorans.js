
// <!---------------- Flipping Card ---------------->
// $( function() {
//     $('.cards button').click( function( event ) {
//       $( event.currentTarget ).toggleClass('flipped');
//     });
    
//   });




// <!---------------- Image Carousel ---------------->

let arr = [];

fetch("http://localhost:3000/users/")
  .then((res) => res.json())
  .then((data) => {

    arr = data;
    console.log(arr);
    printData();
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
        margin: 10,
        dots: true,
        loop: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 3000,
      });
    });
  });

  let carouselContainer = document.querySelector('.owl-carousel')

  const printData = () => {
    arr.forEach(element=>{
      carouselContainer.innerHTML+= `
      <div class="mycard">
      <div class="mycard-header">
        <img src="./assets/img/faq-1.png" />
      </div>
    </div>
      `
    })
  }
