function importAll(r) {
  return r.keys().map(r);
}

// Import all model-const vars on initial loading of app
const allVars = {};
const allImported = importAll(require.context("./", true, /\.(json)$/));
allImported.forEach(r => {
  Object.keys(r).forEach(k => {
    allVars[k] = r[k]
  })
})

const varList = (varname) => {
  let vars = [];  
  
  if (allVars[varname]) {
    return allVars[varname]
  }

  return vars
}

export const varLabel = (varname, value) => {
  const vars = varList(varname);
  let label = "";
  vars.forEach((el) => {
    if (el.value === value * 1) {
      label = el.label;
    }
  });
  return label;
};
export const varShortLabel = (varname, value) => {
  const vars = varList(varname);
  let label = "";
  vars.forEach((el) => {
    if (el.value === value * 1) {
      label = el.label2;
    }
  });
  return label;
};
export const varKey = (varname, value) => {
  const vars = varList(varname);
  let key = "";
  vars.forEach((el) => {
    if (el.value === value * 1) {
      key = el.key;
    }
  });
  return key;
};
export const varValue = (varname, key) => {
  const vars = varList(varname);
  let value = "";
  vars.forEach((el) => {
    if (el.key === key) {
      value = el.value;
    }
  });
  return value;
};
export const varOptions = (varname) => {
  const vars = varList(varname);
  const options = [];
  vars.forEach((el) => {
    options.push({
      "label": el.label,
      "value": el.value,
      "key": el.value
    });
  });
  return options;
};
export const varOptionsWithDefault = (varname, defaultLabel = "") => {
  const vars = varList(varname);
  const options = [
    {
      "label": defaultLabel,
      "value": "",
      "key": ""
    },
  ];
  vars.forEach((el) => {
    options.push({
      "label": el.label,
      "value": el.value,
      "key": el.value
    });
  });
  return options;
};

export const varColor = (varname, value) => {
  const vars = varList(varname);
  let color = "#000";
  vars.forEach((el) => {
    if (el.value === value && el.color) {
      color = el.color;
    }
  });
  return color;
};

export const varBgColor = (varname, value) => {
  const vars = varList(varname);
  let bgColor = "#fff";
  vars.forEach((el) => {
    if (el.value === value && el.bgColor) {
      bgColor = el.bgColor;
    }
  });
  return bgColor;
};

export const varIs = (varname, value, key) => {
  let isSame = false
  const vars = varList(varname);
  let value0 = value
  if (!isNaN(value0)) {
    value0 = value0*1
  }
  vars.forEach((el) => {
    if (el.value === value0 && 
      el.key === key
    ) {
      isSame = true
    }
  })

  return isSame
}

export const varIsIn = (varname, value, keys) => {
  let isSame = false
  const vars = varList(varname);
  let value0 = value
  if (!isNaN(value0)) {
    value0 = value0*1
  }
  vars.forEach((el) => {
    keys.forEach(key => {
      if (el.value === value0 && 
        el.key === key
      ) {
        isSame = true
      }
    })    
  })

  return isSame
}
