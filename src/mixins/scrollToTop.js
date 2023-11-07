export default {
  /**
   * @description:scroll to last
   * @param {} none
   *
   * @return none
   */
  scrollToTop() {
    let element = document.querySelector('.c-chat__body');
    $('.c-chat__body').animate({ scrollTop: element.scrollHeight }, 800);
  },
};
