const handleMabyRefs = (refs, callBack, ...args) => {
  refs.forEach(ele => {
    const maybeRef = ele.value;
    if (Array.isArray(maybeRef)) {
      maybeRef.forEach(ref => {
        callBack(ref, ...args);
      });
    } else {
      callBack(maybeRef, ...args);
    }
  });
};

export const setStyle = (refs, styles) => {
  const _setStyle = (ref) => {
    Object.keys(styles).forEach(key => {
      ref.style[key] = styles[key];
    });
  };
  handleMabyRefs(refs, _setStyle);
};

export const transTo = (refs, duration, targetStyles) => {
  const runAni = () => {

  };
  handleMabyRefs(refs, runAni);
};