(function () {
    var Hangman = function (parameters) {
        parameters = parameters || {};
        /**
         * Private fields.
         */
        var DEFAULT_RETRY_VALUE = 3;
        var DEFAULT_MASK = "*";
        var words = parameters.words ? parameters.words : [];
        var activeWord;
        var maskedWord;
        var retries = parameters.retries ? parameters.retries : DEFAULT_RETRY_VALUE;
        var retryCounter = 0;
        var mask = parameters.mask ? parameters.mask : DEFAULT_MASK;

        /**
         * Gets all indexes of 'character' in the current game active word.
         * Private.
         * @param value
         * @returns {Array}
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
         * If no character was fount the retry counter is incremented.
         * Private.
         * @param character
         */
        var replaceAllFoundCharacters = function (character) {
            var indexes = getAllIndexes(character);
            if (indexes.length == 0) {
                retryCounter++;
            }
            indexes.forEach(function (index) {
                maskedWord = maskedWord.substr(0, index) + activeWord[index] + maskedWord.substr(index + character.length);
            });
        }

        /**
         * Returns the success message.
         * Private.
         * @returns {string}
         */
        var getSuccessMessage = function () {
            var highScore = retryCounter == 0;
            return highScore ? "Congratulations, you won with NO failed attempts!" : "Game over! You won!";
        }

        /**
         * Adds 'word' to the word list.
         * Public.
         * @param value
         */
        this.addWord = function (word) {
            words.push(word);
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
                maskedWord += mask;
                i++;
            }
            return maskedWord;
        };

        /**
         * Checks if character is in the word and returns the updated game status.
         * Public.
         * @param character
         * @returns { maskedWord: The updated masked word.
         *            gameOver: True if the game is over.
         *            message: The status message of the game.
         *          }
         */
        this.checkCharacter = function (character) {
            if (retryCounter == retries) {
                return {
                    maskedWord: activeWord,
                    gameOver: true,
                    message: "Game over! You lost! The word was: " + activeWord + "."
                }
            }
            replaceAllFoundCharacters(character);
            return {
                maskedWord: maskedWord,
                gameOver: maskedWord == activeWord,
                message: maskedWord == activeWord ? getSuccessMessage() : "Keep playing!"
            }
        };
    };

    return window.Hangman = Hangman;
})();