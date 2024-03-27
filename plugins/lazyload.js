import Vue from 'vue';

const imageLoaded = function (e) {
  e.target.parentElement.classList.remove('lazyerror', 'lazyloading');
  e.target.parentElement.classList.add('lazyloaded');
};

const imageError = function (e) {
  e.target.parentElement.classList.remove('lazyloaded', 'lazyloading');
  e.target.parentElement.classList.add('lazyerror');
};

const loadImage = function (el, path) {

  el.parentElement.classList.remove('lazyerror', 'lazyloaded');
  el.parentElement.classList.add('lazyloading');

  el.addEventListener('load', imageLoaded);

  el.addEventListener('error', imageError);

  el.src = path;
};

Vue.directive('lazyload', {
  inserted (el, binding) {
    function handleIntersect (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          loadImage(el, binding.value);
          observer.unobserve(el);
        }
      });
    }

    function createObserver () {
      const options = {
        root: null,
        threshold: '0',
      };

      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    if (!window.IntersectionObserver) {
      loadImage(el, binding.value);
    } else {
      createObserver();
    }
  },

  update (el, binding) {
    if (binding.value !== el.src) {
      loadImage(el, binding.value);
    }
  },
});
