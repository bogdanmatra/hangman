(function () {
    var Hangman = function (parameters) {
        parameters = parameters || {};
        /**
         * Private fields.
         */
        var DEFAULT_RETRY_VALUE = 3;
        var DEFAULT_MASK = "*";
        var words = parameters.words ? parameters.words : [];
        var retries = parameters.retries ? parameters.retries : DEFAULT_RETRY_VALUE;
        var mask = parameters.mask ? parameters.mask : DEFAULT_MASK;
        var retryCounter = 0;
        var activeWord;
        var maskedWord;

        /**
         * Gets all indexes of the character in the current game active word.
         * Private.
         * @param character The character to search for.
         * @returns {Array} Array of indexes.
         */
        var getAllIndexes = function (character) {
            var indexes = [], i = -1;
            while ((i = activeWord.toLowerCase().indexOf(character.toLowerCase(), i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        };

        /**
         * Replaces all masked characters with the found character.
         * If no character was found the retry counter is incremented.
         * Private.
         * @param character The character to search for.
         */
        var replaceAllFoundCharacters = function (character) {
            var indexes = getAllIndexes(character);
            if (indexes.length == 0) {
                retryCounter++;
            }
            indexes.forEach(function (index) {
                maskedWord = maskedWord.substr(0, index) + activeWord[index] + maskedWord.substr(index + character.length);
            });
        };

        /**
         * Adds word to the word list.
         * Public.
         * @param word The additional word.
         */
        this.addWord = function (word) {
            words.push(word);
        };

        /**
         * Returns the retry counter.
         * Public.
         * @returns {number} The value of the retry counter.
         */
        this.getRetryCounter = function () {
            return retryCounter;
        };

        /**
         * Returns the total number of retries.
         * Public.
         * @returns {number} The total number of retires available.
         */
        this.getNumberOfRetries = function () {
            return retries;
        };

        /**
         * Starts game and returns the masked word.
         * Public.
         * @returns {string} The fully masked word.
         */
        this.startGame = function () {
            activeWord = words[Math.floor(Math.random() * words.length)];
            var i = 0;
            maskedWord = "";
            while (i < activeWord.length) {
                maskedWord += mask;
                i++;
            }
            return maskedWord;
        };

        /**
         * Checks if character is in the word and returns the updated game status.
         * Public.
         * @param character The character to check for.
         * @returns {Object} status The game status.
         * @returns {string} status.maskedWord The updated masked word.
         * @returns {boolean} status.gameOver True if the game is over.
         * @returns {boolean} status.gameLost True if the game is lost.
         * @returns {boolean} status.highScore True if there was no failed attempt.
         */

        this.checkCharacter = function (character) {
            replaceAllFoundCharacters(character);
            if (retryCounter == retries) {
                return {
                    maskedWord: activeWord,
                    gameOver: true,
                    gameLost: true
                }
            }
            return {
                maskedWord: maskedWord,
                gameOver: maskedWord == activeWord,
                highScore: retryCounter == 0
            }
        };
    };

    return window.Hangman = Hangman;
})();