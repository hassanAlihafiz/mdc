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

export const uiVarList = (varname) => {
  let vars = [];  
  
  if (allVars[varname]) {
    return allVars[varname]
  }

  return vars
}

export const uiVarLabel = (varname, value) => {
  const vars = uiVarList(varname);
  let label = "";
  if (isNaN(value)) {
    vars.forEach((el) => {
      if (el.value == value) {
        label = el.label;
      }
    });
  } else {
    vars.forEach((el) => {
      if (el.value === value * 1) {
        label = el.label;
      }
    });
  }
  return label;
};
export const uiVarShortLabel = (varname, value) => {
  const vars = uiVarList(varname);
  let label = "";
  vars.forEach((el) => {
    if (el.value === value * 1) {
      label = el.label2;
    }
  });
  return label;
};
export const uiVarKey = (varname, value) => {
  const vars = uiVarList(varname);
  let key = "";
  vars.forEach((el) => {
    if (el.value === value * 1) {
      key = el.key;
    }
  });
  return key;
};
export const uiVarValue = (varname, key) => {
  const vars = uiVarList(varname);
  let value = "";
  vars.forEach((el) => {
    if (el.key === key) {
      value = el.value;
    }
  });
  return value;
};
export const uiVarOptions = (varname) => {
  const vars = uiVarList(varname);
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
export const uiVarOptionsWithDefault = (varname, defaultLabel = "") => {
  const vars = uiVarList(varname);
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

export const uiVarColor = (varname, value) => {
  const vars = uiVarList(varname);
  let color = "#000";
  vars.forEach((el) => {
    if (el.value === value && el.color) {
      color = el.color;
    }
  });
  return color;
};

export const uiVarBgColor = (varname, value) => {
  const vars = uiVarList(varname);
  let bgColor = "#fff";
  vars.forEach((el) => {
    if (el.value === value && el.bgColor) {
      bgColor = el.bgColor;
    }
  });
  return bgColor;
};

export const uiVarIs = (varname, value, key) => {
  let isSame = false
  const vars = uiVarList(varname);
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

export const uiVarIsIn = (varname, value, keys) => {
  let isSame = false
  const vars = uiVarList(varname);
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
