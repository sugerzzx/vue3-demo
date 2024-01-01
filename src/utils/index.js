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

const getMatrix = (ele, x, y) => {
  if (x || y) {
    const matrixVal = ele.style.transform.match(/\(([^)]+)\)/)[1].split(',');
    const preX = matrixVal[4];
    const preY = matrixVal[5];
    x = x ? x : preX;
    y = y ? y : preY;
    return `matrix(1,0,0,1,${x},${y})`;
  }
  return '';
};

export const transTo = (maybeyRefs, aniOptions) => {
  let { x, y, opicty, duration, dely, easing } = aniOptions;
  const options = {
    duration: duration * 1000,
    dely: dely,
    fill: 'forwards',
    easing: easing
  };
  const runAni = (ele) => {
    const keyframes = {
      transform: getMatrix(ele, x, y),
      opicty
    };
    ele.animate(keyframes, options);
  };
  handleMabyRefs(maybeyRefs, runAni);
};