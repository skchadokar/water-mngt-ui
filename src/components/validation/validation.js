import {ipv4Pattern,ipv6Pattern,ipv6And4Pattern} from './constants';

export class Validation{
   // ipv4Pattern = "(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.){3}([01]?\\d\\d?|2[0-4]\\d|25[0-5])";
    // ipv6Pattern = "([0-9a-f]{1,4}:){7}([0-9a-f]){1,4}";
  
validateIpv6And4=(val)=>{
     //test ipv4
     if (ipv6And4Pattern.test(val)) {
      return  true;
    }else{
      return  false;
    }
}


validateIpv4=(val)=>{

    //test ipv4
    if (ipv4Pattern.test(val)) {

        return  true;
    } else {
      return  false;
    }

}


validateIpv6=(val)=>{
    //test ipv6  
     if (ipv6Pattern.test(val)){
        return  true;
    } else {
      return  false;
    }
}
}