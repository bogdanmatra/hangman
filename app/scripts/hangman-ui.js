(function () {
    $(function () {
        var hangmanGame;
        var $character = $("#hangman-character");
        var $wordContainer = $("#hangman-word-container");
        var $hangmanCounter = $("#hangman-counter");

        /**
         * Updates UI counter.
         */
        var updateCounter = function () {
            $hangmanCounter.html(hangmanGame.getRetryCounter() + " of " + hangmanGame.getNumberOfRetries());
        }

        /**
         * Starts a new game and updates UI.
         */
        var newGame = function () {
            hangmanGame = new Hangman({
                words: ["3dhubs", "marvin", "print", "filament", "order"],
                retries: 5
            });
            hangmanGame.addWord("bogdan");
            var maskedWord = hangmanGame.startGame();
            $wordContainer.html(maskedWord);
            updateCounter();
            $character.focus();
        }

        /**
         * Checks if the entered character is in the masked word and updates UI.
         */
        var checkValue = function (character) {
            var result = hangmanGame.checkCharacter(character);
            $wordContainer.html(result.maskedWord);
            updateCounter();
            if (result.gameOver) {
                alert(result.message);
                newGame();
            }
        };

        /* Attach handlers. */
        $("#hangman-new-game").click(newGame);
        $character.keypress(function (event) {
            checkValue(event.key);
            window.setTimeout(function () {
                $character.val("");
            })
        });

        /* Start the game. */
        newGame();
    });

})();