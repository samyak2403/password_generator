document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const lengthInput = document.querySelector("#length-number");
    const lengthValue = document.querySelector("#length-value");
    const uppercaseCheck = document.querySelector("#uppercase");
    const lowercaseCheck = document.querySelector("#lowercase");
    const numbersCheck = document.querySelector("#numbers");
    const symbolsCheck = document.querySelector("#symbols");
    const passwordDisplay = document.querySelector("#pass-display");
    const passwordContainer = document.querySelector(".password-display");
    const generateBtn = document.querySelector("#generate");
    const toast = document.querySelector("#toast");
    const radioButtons = document.querySelectorAll('.radio-button');

    // Character sets
    const CHARACTER_SETS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]\\:;?><,./-='
    };

    // Initialize radio buttons
    radioButtons.forEach(radioBtn => {
        const input = radioBtn.querySelector('input');
        
        // Add click handler to the radio button container
        radioBtn.addEventListener('click', (e) => {
            // Don't toggle if clicking directly on the input (browser handles this)
            if (e.target !== input) {
                input.checked = !input.checked;
                // Trigger change event to ensure any listeners are notified
                input.dispatchEvent(new Event('change'));
            }
        });
        
        // Add keyboard accessibility
        radioBtn.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                input.checked = !input.checked;
                input.dispatchEvent(new Event('change'));
            }
        });
        
        // Make the container focusable
        radioBtn.setAttribute('tabindex', '0');
    });

    // Update length value display
    lengthInput.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });

    // Generate password
    function generatePassword() {
        let availableChars = '';
        const selectedSets = [];
        
        // Check which character sets are selected
        if (uppercaseCheck.checked) {
            availableChars += CHARACTER_SETS.uppercase;
            selectedSets.push(CHARACTER_SETS.uppercase);
        }
        if (lowercaseCheck.checked) {
            availableChars += CHARACTER_SETS.lowercase;
            selectedSets.push(CHARACTER_SETS.lowercase);
        }
        if (numbersCheck.checked) {
            availableChars += CHARACTER_SETS.numbers;
            selectedSets.push(CHARACTER_SETS.numbers);
        }
        if (symbolsCheck.checked) {
            availableChars += CHARACTER_SETS.symbols;
            selectedSets.push(CHARACTER_SETS.symbols);
        }

        // If no character set is selected, show error
        if (availableChars.length === 0) {
            showToast('Please select at least one character type', 'error');
            return '';
        }

        let password = '';
        const length = parseInt(lengthInput.value);

        // Ensure at least one character from each selected set
        selectedSets.forEach(set => {
            const randomChar = set[Math.floor(Math.random() * set.length)];
            password += randomChar;
        });

        // Fill the rest of the password
        for (let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }

        // Shuffle the password to mix the guaranteed characters
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        return password.substring(0, length); // Ensure exact length
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Check password strength and update UI
    function checkPasswordStrength(password) {
        // This is a simple implementation - could be expanded for more accurate strength measurement
        let strength = 0;
        
        // Length check
        if (password.length >= 12) strength += 1;
        if (password.length >= 16) strength += 1;
        
        // Character types check
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return strength;
    }

    // Event Listeners
    generateBtn.addEventListener('click', () => {
        // Add loading state
        generateBtn.classList.add('loading');
        generateBtn.textContent = 'GENERATING...';
        
        // Simulate loading for visual feedback
        setTimeout(() => {
            const password = generatePassword();
            if (password) {
                passwordDisplay.textContent = password;
                
                // Check strength and add appropriate class
                const strength = checkPasswordStrength(password);
                passwordDisplay.className = 'password-text';
                if (strength <= 2) {
                    passwordDisplay.classList.add('weak');
                } else if (strength <= 4) {
                    passwordDisplay.classList.add('medium');
                } else {
                    passwordDisplay.classList.add('strong');
                }
            }
            generateBtn.classList.remove('loading');
            generateBtn.textContent = 'GENERATE PASSWORD';
        }, 300);
    });

    passwordContainer.addEventListener('click', () => {
        const password = passwordDisplay.textContent;
        if (!password) {
            showToast('Generate a password first!', 'error');
            return;
        }

        navigator.clipboard.writeText(password).then(() => {
            // Visual feedback animation
            passwordContainer.classList.add('copied');
            setTimeout(() => {
                passwordContainer.classList.remove('copied');
            }, 700);
            
            // Show success message
            showToast('Password copied to clipboard!');
        }).catch(() => {
            showToast('Failed to copy password', 'error');
        });
    });

    // Generate initial password
    generateBtn.click();
}); 