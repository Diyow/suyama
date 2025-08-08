// Utility Helper Functions

/**
 * DOM Utilities
 */
const DOMUtils = {
  // Get element by ID with error handling
  getElementById: (id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID '${id}' not found`);
    }
    return element;
  },

  // Get elements by class name
  getElementsByClass: (className) => {
    return document.getElementsByClassName(className);
  },

  // Add event listener with error handling
  addEventListenerSafe: (element, event, handler) => {
    if (element && typeof handler === 'function') {
      element.addEventListener(event, handler);
    } else {
      console.warn('Invalid element or handler for event listener');
    }
  },

  // Toggle class on element
  toggleClass: (element, className) => {
    if (element) {
      element.classList.toggle(className);
    }
  }
};

/**
 * Form Utilities
 */
const FormUtils = {
  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate required fields
  validateRequired: (value) => {
    return value && value.trim().length > 0;
  },

  // Get form data as object
  getFormData: (form) => {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  },

  // Reset form with confirmation
  resetForm: (form, showConfirmation = true) => {
    if (form) {
      form.reset();
      if (showConfirmation) {
        console.log('Form reset successfully');
      }
    }
  }
};

/**
 * Animation Utilities
 */
const AnimationUtils = {
  // Smooth scroll to element
  smoothScrollTo: (element, offset = 0) => {
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  },

  // Fade in element
  fadeIn: (element, duration = 300) => {
    if (element) {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  },

  // Fade out element
  fadeOut: (element, duration = 300) => {
    if (element) {
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(1 - (progress / duration), 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
        }
      };
      
      requestAnimationFrame(animate);
    }
  }
};

/**
 * Performance Utilities
 */
const PerformanceUtils = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Measure performance
  measurePerformance: (name, func) => {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }
};

/**
 * Storage Utilities
 */
const StorageUtils = {
  // Local storage with error handling
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DOMUtils,
    FormUtils,
    AnimationUtils,
    PerformanceUtils,
    StorageUtils
  };
} else {
  window.Utils = {
    DOMUtils,
    FormUtils,
    AnimationUtils,
    PerformanceUtils,
    StorageUtils
  };
}