document.addEventListener('DOMContentLoaded', () => {
    function showCustomAlert(message) {
        const alertMessageElement = document.getElementById('custom-alert-message');
        if (alertMessageElement) {
            alertMessageElement.textContent = message;
            document.getElementById('custom-alert').style.display = 'flex';

            // Focus the OK button so it can be activated by Enter key
            const okButton = document.getElementById('custom-alert-ok-button');
            okButton.focus();

            // Add an event listener for the Enter key
            document.addEventListener('keydown', handleEnterKey);
        } else {
            console.error("Element with ID 'custom-alert-message' not found.");
        }
    }

    function closeCustomAlert() {
        document.getElementById('custom-alert').style.display = 'none';

        // Remove the event listener for the Enter key
        document.removeEventListener('keydown', handleEnterKey);
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            closeCustomAlert();
        }
    }

    // Expose functions to the global scope if needed
    window.showCustomAlert = showCustomAlert;
    window.closeCustomAlert = closeCustomAlert;
});
