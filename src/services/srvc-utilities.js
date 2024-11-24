import { Route, useLocation } from "react-router-dom";


export const GetEnvironment = async () => {
  
  return (window.location.hostname === "localhost" ? 'test' : "main")

}

// export function ActiveLink (){
//   let { path } = useLocation();
//   if ( path.slice(4).indexOf("/") >-1 ){
//     return (path.slice(4).substring(0,path.slice(1).indexOf("/")))
//   } else { 
//     return (path.slice(4))
//   }
// }

export function ActiveSiteLink (){
  let location = useLocation();
  // console.log (location)
  if ( location.pathname.slice(1).indexOf("/") >-1 ){
    return (location.pathname.slice(1).substring(0,location.pathname.slice(1).indexOf("/")))
  } else { 
    return (location.pathname.slice(1))
  }
}

export function GetUserForm (){
  const location = useLocation();
  return location.pathname.split('/')[1]
}

export function NumberFormat (number, format, decimal){

  if (number == '******') 
  return '******'

  if (isNaN(number)) 
  return number
	
  var data = number //Math.round(data*100)/100
	var nmbx = data.toString().split('.')[0]
  var nmbz = data.toString().split('.')[1] || '000000'

  if (nmbx.length <= 3) {}
  else {
  	var nmxx = nmbx.substring(0,nmbx.length-3) 
  	nmxx = format === "www" 
    ? nmxx.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	  : nmxx.replace(/\B(?=(\d{2})+(?!\d))/g, ",")

    nmbx = nmxx + ',' + nmbx.substring(nmbx.length-3)
  }
  
  var nmzz = nmbz == 0 
  	? (10**decimal).toString().substring(1)
    : Math.round(nmbz/(10**(nmbz.length-decimal)))
  
  return nmbx + (decimal > 0 ? '.' + nmzz : '') 

}


export function NumberFormatOld (data, form, decimal){

  if (data == '******') return '******'

  var data = Math.round(data)/1000000
	// var nmbr = data.toString().split('.')[1] 
  // ? data.toString().split('.')[1].length === 2
  // 	? data.toString()
  //   : data.toString()+'0'
  // : data.toString()+'.00'
  
	var number = data.toString().split('.')

  if (number[0].length <=6)   return number.join('.')
  else {
  	var nmbx = number[0].substr(0, number[0].length-3) 
  	nmbx = form === "ww" 
    ? nmbx.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	  : nmbx.replace(/\B(?=(\d{2})+(?!\d))/g, ",")

    number[0] = nmbx + ',' + number[0].substr(number[0].length-3,3)
    return decimal && decimal == 2 ? number.join('.') : number.toString()
  }
}

export function numbex (number, form){

  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});