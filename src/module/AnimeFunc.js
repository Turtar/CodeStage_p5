export function codeAnime(isTop) {
  const stagePart = isTop ? '#top-stage' : '#bottom-stage';
  anime
    .timeline()
    .add({
      targets: stagePart,
      translateY: isTop ? 0 : 600,
      rotate: {
        value: -90,
        duration: 1000,
        easing: 'cubicBezier(0, 0, 0.58, 1.0)'
      },
      scaleX: {
        value: isTop ? -1 : 1,
        duration: 1000,
        easing: 'linear'
      }
    })
    .add({
      targets: stagePart,
      opacity: 0,
      delay: 10,
      duration: 1000,
      easing: 'easeOutSine'
    })
    .add({
      targets: stagePart,
      zIndex: -100,
      // delay: 150,

      complete: function() {
        $(stagePart).css('display', 'none');
      }
    });
}
