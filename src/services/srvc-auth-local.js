// auth

export const AuthClearStore = async() => {
  // logout current user

  localStorage.clear();
  localStorage.setItem("auth",null);
  localStorage.setItem("indx",null);
  localStorage.setItem("bznx",null);
  localStorage.setItem("indz",null);
  localStorage.setItem("bznz",null);

}

export const SetAuthUser=(asset)=>{
  localStorage.setItem('auth', JSON.stringify(asset));
}

export const GetAuthUser=()=>{
  return JSON.parse(localStorage.getItem("auth"));
}

export const SetLocalUser=(asset)=>{
  localStorage.setItem('indx', JSON.stringify(asset));
}

export const GetLocalUser=()=>{
  return JSON.parse(localStorage.getItem("indx"));
}

export const SetLocalBusiness=(asset)=>{
  localStorage.setItem('bznx', JSON.stringify(asset));
}

export const GetLocalBusiness=()=>{
  return JSON.parse(localStorage.getItem("bznx"));
}

export const SetNewUser=(asset)=>{
  localStorage.setItem('indz', JSON.stringify(asset));
}

export const GetNewUser=()=>{
  return JSON.parse(localStorage.getItem("indz"));
}

export const SetNewBusiness=(asset)=>{
  localStorage.setItem('bznz', JSON.stringify(asset));
}

export const GetNewBusiness=()=>{
  return JSON.parse(localStorage.getItem("bznz"));
}