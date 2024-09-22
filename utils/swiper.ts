const Swiper = {
  swipeLeft: () => {},
  swipeRight: () => {},
  initializeSwiper: function(swipeFunction: {
    left: () => void;
    right: () => void;
  }) {
    const { left, right } = swipeFunction;
    this.swipeLeft = function() {
      try {
        console.log("Swiper: About to Swipe Left");
        left();
        console.log("Swiper: Swiped Left");
      } catch (err) {
        throw err;
      }
    };
    this.swipeRight = function() {
      try {
        console.log("Swiper: About to Swipe Right");
        right();
        console.log("Swiper: Swiped Right");
      } catch (err) {
        throw err;
      }
    };
  }
};

export default Swiper;
export const swipeLeft = () => Swiper.swipeLeft();
export const swipeRight = () => Swiper.swipeRight();
