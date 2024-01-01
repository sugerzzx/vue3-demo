const handleMabyRefs = (maybeyRefs, callBack, ...args) => {
  if (Array.isArray(maybeyRefs)) {
    const refs = maybeyRefs;
    refs.forEach(ele => {
      const maybeEles = ele.value;
      if (Array.isArray(maybeEles)) {
        maybeEles.forEach(ele => {
          callBack(ele, ...args);
        });
      } else {
        const ele = maybeEles;
        callBack(ele, ...args);
      }
    });
  } else {
    const ele = maybeyRefs.value;
    callBack(ele, ...args);
  }
};

export const setStyle = (maybeyRefs, styles) => {
  const _setStyle = (ele) => {
    Object.keys(styles).forEach(key => {
      const styleValue = styles[key];
      if (key === 'x' || key === 'y') {
        ele.style.transform = `matrix(1,0,0,1,${key === 'x' ? `${styleValue},0` : `0,${styleValue}`})`;
        return;
      }
      ele.style[key] = styleValue;
    });
  };
  handleMabyRefs(maybeyRefs, _setStyle);
};

const getMatrix = (transform, x, y) => {
  if (x || y) {
    let preX;
    let preY;
    if (transform) {
      const matrixVal = transform?.match(/\(([^)]+)\)/)[1].split(',');
      preX = matrixVal[4];
      preY = matrixVal[5];
    } else {
      preX = 0;
      preY = 0;
    }
    x = x ? x : preX;
    y = y ? y : preY;
    return `matrix(1,0,0,1,${x},${y})`;
  }
  return '';
};

export const transTo = (maybeyRefs, duration, aniOptions) => {
  let { x, y, opacity = '', rotate = '', transformOrigin, dely = 0, easing } = aniOptions;
  const options = {
    duration: duration * 1000,
    dely: dely,
    fill: 'forwards',
    easing: easing
  };
  const runAni = (ele) => {
    // ele.style.transformOrigin = '250px center';
    const style = ele.style;
    const transform = style.transform;
    const keyframes = [
      {
        transform: style.transform,
        opacity: style.opacity,
        rotate: style.rotate
      },
      {
        transform: getMatrix(transform, x, y) + ' ' + `rotate(${rotate}deg)`,
        opacity,
      }
    ];

    ele.animate(keyframes, options);
  };
  handleMabyRefs(maybeyRefs, runAni);
};