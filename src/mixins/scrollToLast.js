export default {
  /**
   * @description:scroll to last
   * @param {} none
   *
   * @return none
   */
  scrollToLast() {
    let element = document.querySelector(".c-chat__body");
    $(".c-chat__body").animate({ scrollTop: element.scrollHeight }, 800);
  },
};
