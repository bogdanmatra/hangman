(function () {
    var Hangman = function (parameters) {
        parameters ? parameters : {};
        /**
         * Private fields.
         */
        var DEFAULT_RETRY_VALUE = 3;
        var words = parameters.words ? parameters.words : [];
        var activeWord;
        var maskedWord;
        var retries = parameters.retries ? parameters.retries : DEFAULT_RETRY_VALUE;
        var retryCounter = 0;

        /**
         * Gets all indexes of 'character' in the active word.
         * Private.
         * @param value
         * @returns {Array}
         */
        var getAllIndexes = function (character) {
            var indexes = [], i = -1;
            while ((i = activeWord.indexOf(character, i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        };

        /**
         * Ads 'value' to the word list.
         * Public.
         * @param value
         */
        this.addWord = function (value) {
            words.push(value);
        };

        /**
         * Returns the retry counter.
         * Public.
         * @returns {number}
         */
        this.getRetryCounter = function () {
            return retryCounter;
        };

        /**
         * Returns the total number of retries.
         * Public.
         * @returns {number}
         */
        this.getNumberOfRetries = function () {
            return retries;
        };

        /**
         * Starts game and returnes the masked word.
         * Public.
         * @returns {string}
         */
        this.startGame = function () {
            activeWord = words[Math.floor(Math.random() * words.length)];
            var i = 0;
            maskedWord = "";
            while (i < activeWord.length) {
                maskedWord += "*";
                i++;
            }
            return maskedWord;
        };

        /**
         * Checks if 'character' is in the word.
         * Public.
         * @param character
         * @returns { maskedWord: The updated masked word.
         *            gameOver: True if the game is over.
         *            message: The status message of the game.
         * }
         */
        this.checkCharacter = function (character) {
            if (retryCounter == retries) {
                return {
                    gameOver: true,
                    message: "Game over! You lost!"
                }
            }
            var indexes = getAllIndexes(character);
            if (indexes.length == 0) {
                retryCounter++;
            }
            indexes.forEach(function (index) {
                maskedWord = maskedWord.substr(0, index) + character + maskedWord.substr(index + character.length);
            });
            return {
                maskedWord: maskedWord,
                gameOver: maskedWord == activeWord,
                message: maskedWord == activeWord ? "Game over! You won!" : "Keep playing!"
            }
        };
    };

    return window.Hangman = Hangman;
})();