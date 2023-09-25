export const ValidateNumInput = {
  methods: {
    /**
     * check japanese character in string, only use in number input
     * @param {string} str string need to check
     */
    isJapanese(str) {
      const japaneseRegex =
        /[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[a-zA-Z]+|[ａ-ｚＡ-Ｚ０-９]+|[々〆〤ヶ]+/u;
      return !japaneseRegex.test(str);
    },
    validNumber(e, isFraction = true) {
      const charStr = e.key;
      if (charStr.match(/^[a-zA-z~!@#$%^&*(_=+[{}\]\\;':",/<>?)]$/)) {
        e.preventDefault();
      }
      if (!isFraction && charStr === '.') {
        e.preventDefault();
      }
    },
    /**
     * Valid Number Tax
     * @param {*} e
     * @param {int} fractionLimit integer part of a fraction (tax) <= (2 <=> 99.99999999)
     */
    validNumberTax(e, fractionLimit = 2) {
      const charStr = e.key;
      const str = e.target.value;
      if (charStr.match(/^[a-zA-z~!@#$%^&*(_=+[{}\]\\;':",/<>?)]$/)) {
        e.preventDefault();
      }
      var numberDot = str.split('.').length - 1;
      var isNotFraction = (!str.length || numberDot) && charStr == '.'; // is Not Fraction
      var checkDot = charStr == '.' && str.length > fractionLimit; // Dot appears at position <= 2
      var isTaxLimit =
        !numberDot && charStr.match(/^[0-9]$/) && str.length >= fractionLimit; // exceed 100

      if (isNotFraction || checkDot || isTaxLimit) {
        e.preventDefault();
      }
    },
    /**
     * @description Block input 0 as first number
     * @param {KeyboardEvent} e
     * @returns {void}
     */
    validNumberBlockInputZeroFirst(e) {
      const currentCharacter = e.key;
      const fullString = e.target.value;
      const noneNumericRegex = /^[a-zA-z~!@#$%^&*(_=+[{}\]\\;':",/<>?)]$/;
      if (
        currentCharacter.match(noneNumericRegex) ||
        (!fullString.length && currentCharacter == '0')
      ) {
        e.preventDefault();
      }
    },
  },
};
