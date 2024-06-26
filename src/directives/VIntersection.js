export default {
  mounted(elem, binding) {
    const options = {
      rottMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(elem);
  },
  name: "intersection",
};
