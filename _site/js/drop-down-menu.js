// Enhanced dropdown functionality with precise hover detection
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const navItem = dropdown.querySelector('.nav-item');
        let isDropdownOpen = false;

        // Show dropdown only when hovering over the nav-item
        navItem.addEventListener('mouseenter', () => {
            isDropdownOpen = true;
            dropdownContent.style.display = 'block';
            // Small delay to ensure smooth animation
            requestAnimationFrame(() => {
                dropdownContent.style.transform = 'translateY(0)';
                dropdownContent.style.opacity = '1';
            });
        });

        // Hide dropdown when leaving nav-item (unless moving to dropdown content or bridge)
        navItem.addEventListener('mouseleave', (e) => {
            // Check if we're moving to the dropdown content or bridge
            const relatedTarget = e.relatedTarget;
            if (!dropdownContent.contains(relatedTarget) && !dropdown.contains(relatedTarget)) {
                isDropdownOpen = false;
                hideDropdown();
            }
        });

        // Keep dropdown open when hovering over dropdown content
        dropdownContent.addEventListener('mouseenter', () => {
            isDropdownOpen = true;
        });

        // Keep dropdown open when hovering over the bridge
        dropdown.addEventListener('mouseenter', () => {
            if (isDropdownOpen) {
                // Only maintain state if dropdown was already open
                isDropdownOpen = true;
            }
        });

        // Hide dropdown when leaving dropdown content
        dropdownContent.addEventListener('mouseleave', (e) => {
            // Check if we're moving back to the nav-item
            const relatedTarget = e.relatedTarget;
            if (!navItem.contains(relatedTarget)) {
                isDropdownOpen = false;
                hideDropdown();
            }
        });

        // Hide dropdown when leaving the entire dropdown container
        dropdown.addEventListener('mouseleave', (e) => {
            const relatedTarget = e.relatedTarget;
            if (!dropdownContent.contains(relatedTarget) && !navItem.contains(relatedTarget)) {
                isDropdownOpen = false;
                hideDropdown();
            }
        });

        function hideDropdown() {
            dropdownContent.style.transform = 'translateY(-10px)';
            dropdownContent.style.opacity = '0';
            setTimeout(() => {
                if (!isDropdownOpen) {
                    dropdownContent.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Initialize the dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDropdowns();
});
