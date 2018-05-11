(function () {
    $(function () {
        var hangmanGame;
        var $character = $("#hangman-character");
        var $wordContainer = $("#hangman-word-container");
        var $hangmanCounter = $("#hangman-counter");

        /**
         * Updates the UI after an interaction.
         */
        var updateUI = function (newMaskedWord) {
            $wordContainer.html(newMaskedWord);
            $hangmanCounter.html(hangmanGame.getNumberOfRetries() - hangmanGame.getRetryCounter() + " chances left.");
        }

        /**
         * Starts a new game and initializes it.
         */
        var newGame = function () {
            hangmanGame = new Hangman({
                words: ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'],
                retries: 5
            });
            hangmanGame.addWord("Bogdan");
            var maskedWord = hangmanGame.startGame();
            updateUI(maskedWord);
        }

        /**
         * Checks if the entered character is in the masked word.
         */
        var checkValue = function (character) {
            var result = hangmanGame.checkCharacter(character);
            updateUI(result.maskedWord);
            if (result.gameOver) {
                //Wait for DOM to update before sending the alert.
                window.setTimeout(function () {
                    alert(result.message);
                    newGame();
                });
            }
        };

        /* Attach handlers. */
        $("#hangman-new-game").click(newGame);
        $character.keypress(function (event) {
            // Keep character on screen for half a second.
            window.setTimeout(function () {
                $character.val("");
                checkValue(event.key);
            }, 500);
        });

        /* Keep the focus on the game.*/
        $(document).click(function () {
            $character.focus();
        });

        /* Start the game. */
        newGame();
        $character.focus();
    });
})();