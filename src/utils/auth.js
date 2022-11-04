export const getToken = () => {
  let authData = localStorage.getItem("mdc-auth");
  if (authData) {
    authData = JSON.parse(authData);
    return authData.token;
  }
  return undefined;
};

export const getUser = () => {
  let authData = localStorage.getItem("mdc-auth");
  if (authData) {
    authData = JSON.parse(authData);
    return authData.user;
  }
  return undefined;
};

export const getSudo = () => {
  let authData = localStorage.getItem('mdc-auth')
  if (authData) {
    authData = JSON.parse(authData)
    return authData.sudoName
  }
  return undefined  
}

export const isAuthedUser = () => {
  let authData = localStorage.getItem("mdc-auth");
  if (authData) {
    return true;
  }
  return false;
};

export const saveStorage = (user, token, sudoName) => {
  let authData = JSON.stringify({ user, token, sudoName });
  localStorage.setItem("mdc-auth", authData);
};

export const removeStorage = () => {
  localStorage.removeItem("mdc-auth");
};

export const refreshStorage = (user) => {
  let authData = localStorage.getItem("mdc-auth");
  if (authData) {
    authData = JSON.parse(authData);
    authData.user = user;
    localStorage.setItem("mdc-auth", JSON.stringify(authData));
  }
};
