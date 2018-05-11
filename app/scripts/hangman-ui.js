(function () {
    $(function () {
        var hangmanGame;
        var $hangmanInput = $("#hangman-character");
        var $hangmanWordContainer = $("#hangman-word-container");
        var $hangmanCounter = $("#hangman-counter");
        var $hangmanAlert = $("#hangman-alert");
        var $hangmanNewGame = $("#hangman-new-game");

        var hangmanConfig = {
            words: ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'],
            retries: 5
        };
        var additionalWord = "Bogdan";
        var timeoutCancelId;

        /**
         * Starts a new Hangman game.
         */
        var startNewGame = function () {
            hangmanGame = new Hangman(hangmanConfig);
            hangmanGame.addWord(additionalWord);
            var maskedWord = hangmanGame.startGame();
            updateGameUI(maskedWord);
        };

        /**
         * Updates the UI after an user interaction.
         * @param newMaskedWord The new masked word which should be displayed on the screen.
         */
        var updateGameUI = function (newMaskedWord) {
            $hangmanWordContainer.html(newMaskedWord);
            var chances = hangmanGame.getNumberOfRetries() - hangmanGame.getRetryCounter() - 1;
            $hangmanCounter.html(chances >= 0 ? chances + " chances left." : "");
        };

        /**
         * Updates the Hangman alert with the API result.
         * @param result
         */
        var updateAlert = function (result) {
            var successClass = "hangman-success";
            var failedClass = "hangman-danger";
            var messageClass = ".hangman-message";
            var message, title = result.gameLost ? "Sorry!" : "Congratulations!";
            var successMessage = result.highScore ? "You are the best! Good job, NO failed attempts for you!" : "You won!";
            message = result.gameLost ? "You lost! The word was: " + result.maskedWord + "." : successMessage;
            $hangmanAlert.find(messageClass).addClass(result.gameLost ? failedClass : successClass);
            $hangmanAlert.find(messageClass).removeClass(result.gameLost ? successClass : failedClass);
            $hangmanAlert.find("strong").text(title);
            $hangmanAlert.find("span").text(message);
        };

        /**
         * Shows a custom Hangman alert.
         * @param result The Hangman API result.
         * @param time The time the alert stays on the screen before it disappears.
         */
        var hangmanAlert = function (result, time) {
            updateAlert(result);
            $hangmanAlert.show();
            $hangmanInput.blur();
            timeoutCancelId = window.setTimeout(function () {
                $hangmanAlert.hide();
                $hangmanInput.focus();
                startNewGame();
            }, time);
        };

        /**
         * Handles the user key press input.
         * @param character The character pressed by the user.
         */
        var keyPressHandler = function (character) {
            var result = hangmanGame.checkCharacter(character);
            updateGameUI(result.maskedWord);
            if (result.gameOver) {
                hangmanAlert(result, 5000);
            }
        };

        /* Attach handlers. */
        $hangmanNewGame.click(startNewGame);
        $hangmanInput.keypress(function (event) {
            // Keep character on screen for half a second.
            window.setTimeout(function () {
                $hangmanInput.val("");
                keyPressHandler(event.key);
            }, 500);
        });

        /* Make alert dismissible on click. */
        $hangmanAlert.click(function () {
            $hangmanAlert.hide();
            $hangmanInput.focus();
            window.clearTimeout(timeoutCancelId);
            startNewGame();
        });

        /* Keep the focus on the game.*/
        $(".hangman-container").click(function () {
            $hangmanInput.focus();
        });

        /* Start the game. */
        startNewGame();
        $hangmanInput.focus();
    });
})();