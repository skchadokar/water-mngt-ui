

import {uLogin,uListOfAllEnodeB, uListOfAllOrders,
        uDeletesectorCarrier,uSaveSector} from '../urlConstants';
import {HOST,PORT} from '../urlConstants';
import axios from "axios";

export class FetchService{
     
    createURL=(aURL)=>{
     //   alert(HOST+PORT+aURL);
        console.log("LOG-URL",HOST+PORT+aURL);
        return HOST+PORT+aURL;
    }
   
    //login service and get token from server store in localStorage
        getWorkOrderLoginService(aUser) {
            return axios({
                baseURL: this.createURL(uLogin),
                timeout: 1000,
                method: 'POST',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                data: JSON.stringify(aUser)
                })

        }

     getCustomerService() {
        return axios({
            baseURL: this.createURL(uListOfAllEnodeB),
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
           // data:JSON.stringify(data)
        })
      
    }

    getOrderService() {
        return axios({
            baseURL: this.createURL(uListOfAllOrders),
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               
            }
           // data:JSON.stringify(data)
        })
      
    }

    getGetEnodeBService(id) {
        //(id);
        return axios({
            baseURL: this.createURL(uListOfAllEnodeB)+"/"+id,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               
            }
           // data:JSON.stringify(data)
        })
      
    }
        
 
    // logout workorder
    getLogoutService() {
        localStorage.clear();
    }
      
     
      // workorder     uDeletesectorCarrier delete sector
      getDeleteSectorCarrierService(id) {
        return axios({
            baseURL: this.createURL(uDeletesectorCarrier)+id,
            method: 'DELETE',
            headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'token':localStorage.getItem('token')
                }
            })
      
    }

    

        // workorder    uGetEnodeB 
        getSaveWorkOrderSectorService(customerOrderForm) {
            return axios({
                baseURL: this.createURL(uSaveSector),
                method: 'POST',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'token':localStorage.getItem('token')
                    },
                data:JSON.stringify(customerOrderForm)
                })
          
        }

        
      
  
}