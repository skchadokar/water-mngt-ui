import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Workorder.css';
import SectorCarrier from './SectorCarrier';
import {FetchService} from '../helpers/fetch/services/service';
import {Validation} from './validation/validation';
import createHistory from "history/createBrowserHistory"
import decode from 'jwt-decode';
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit';
import {ic_search} from 'react-icons-kit/md/ic_search';
import Home from './Home';
import Orders from './Orders';
import {plusRound} from 'react-icons-kit/ionicons/plusRound';



const history = createHistory();
class Workorder extends React.Component {
  constructor(props) {
    super(props);
   if(!this.checkTokenExpirationHandler()){
      history.push("/login");
      history.go();
    }
    this.state = {
      customers : '',
      sectorCarriers : [],
      eMBMSObj :'',
      eMBMSObjOldCopy:'',
      enbIdToSearch : '',
      currentEnbId : '',
      id : 0,
      embms: true,
      errorMsg:'',
      showEnodeBlist:true,
      showWorkorderHome:false,
      isLoader : false,
      orders:[],
      showOrderlist:false,
      startDate : new Date()
      
    }

    this.submitFormHandler = this.submitFormHandler.bind(this);
    this.addOrderHandler = this.addOrderHandler.bind(this);
    this.deleteOrderHandler = this.deleteOrderHandler.bind(this);
    this.orderChangeHandler = this.orderChangeHandler.bind(this);
    this.customerChangeHandler = this.customerChangeHandler.bind(this);
    this.getCustomersHandler = this.getCustomersHandler.bind(this);
    this.uuidHandler = this.uuidHandler.bind(this);
    this.fetchServiceHandler = new FetchService();
    this.formValidationHandler= this.formValidationHandler.bind(this);
    this.resetErrorMsg =   this.resetErrorMsg.bind(this);
    this.checkTokenExpirationHandler=this.checkTokenExpirationHandler.bind(this);
    this.sideBarHandler=this.sideBarHandler.bind(this);
    this.logOutHandler=this.logOutHandler.bind(this);
    this.getOrderHandler=this.getOrderHandler.bind(this);
   }

  componentDidMount() {
    console.log('**** Mounted *****')
  }

  toggleCheckSavePopupHandler=(event)=> {
    this.resetErrorMsg();
    event.preventDefault()
  }

  customerChangeHandler = (event) => {
    this.resetErrorMsg();
    const enbCopy = {
      ...this.state.customers
    }
    if(event.target.name==='fname'){
            this.setState({
              currentEnbId : event.target.value,
              enbIdToSearch: event.target.value,
     } )}
    const value =  event.target.value;
    enbCopy[event.target.name] = value;
    this.setState({ customers : enbCopy })

  }

  addOrderHandler = () => {
    this.resetErrorMsg();
    const sCs = [...this.state.orders];
    let newUUIDHandleruuidHandler = this.uuidHandler();
    const newSC = {
                    id : newUUIDHandleruuidHandler, //this.state.id
                    orderDate:new Date(),
                    deliveryDate:new Date()
                  };
    sCs.push(newSC);
    let i = this.state.id;
    i++;
    this.setState({orders : sCs, id : i });
  }

  uuidHandler = () => {
    var dt = new Date().getTime();
    var uuidHandler = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    });
    console.log("******* " + uuidHandler);
    return uuidHandler;
  }



  getOrderHandler=(event)=>{
   
      this.setState({showOrderlist:true});
      this.setState({showWorkorderHome:false});
      this.setState({showEnodeBlist:false});
  }


  orderChangeHandler = (event, id) => {
    this.resetErrorMsg();
    const scIndex = this.state.orders.findIndex(sc => {
      return sc.id === id;
    });
    const sc = {
      ...this.state.orders[scIndex]
    }
    sc[event.target.name] = event.target.value;
    console.log('Id is : ' + id);
    if(event.target.id==='payment'){
        sc['balance'] = sc['total']- sc['payment'];
      
    }else if(event.target.id==='quantity' ){
     sc['perPrice'] =0;
     sc['discount'] =0;
     sc['total']=0;
    }else  if(event.target.id==='perPrice' ){
      sc['discount'] =0;
      sc['total']  = sc['perPrice'] * sc['quantity'];
     }else  if(event.target.id==='discount' ){
      sc['total'] = sc['perPrice'] * sc['quantity']-sc['discount'];
     }
     
   
    const scs = [...this.state.orders]
    scs[scIndex] = sc;
    this.setState(
      {
        orders: scs
      }
    )
  }

  deleteOrderHandler = (secCarrierIndex, id) => {
    this.resetErrorMsg();
    const secCarriers = [...this.state.orders];
    const scIndex = this.state.orders.findIndex(sc => {
      return sc.id === id;
    });
    const sc = {
      ...this.state.orders[scIndex]
    }
    console.log('Id is : ' + id);
    secCarriers.splice(secCarrierIndex, 1);
    this.setState({orders : secCarriers});
  }

  searchCustomer =(event)=>{
    this.fetchServiceHandler.getGetCustomerService(this.state.enbIdToSearch)
    .then(response => response.data )
    .then(data => {
      this.setState({ customers : data.iCustomers });
      this.setState({ orders : data.iOrdersList });
      data.iOrdersList.forEach((element) => {
          element.id = this.uuidHandler();
          console.log(element.id);
      });
      this.setState({
        orders : data.iOrdersList,
        showEnodeBlist:false,
        showWorkorderHome:true,
        showOrderlist:false
        
    });
  console.log('Data: ', data);
  })
    .catch(error => {
      this.setState({errorMsg:'Not Found !'});
      console.error('Error', error)});
  }


getCustomersHandler = (customerId) => {
    this.resetErrorMsg();
    this.setState({enbIdToSearch : customerId});
    this.setState({currentEnbId : customerId});
    this.fetchServiceHandler.getGetEnodeBService(customerId)
    .then(response => response.data )
    .then(data => {
      this.setState({ customers : data.iCustomers });
      this.setState({ orders : data.iOrdersList });
      data.iOrdersList.forEach((element) => {
          element.id = this.uuidHandler();
          console.log(element.id);
      });
      this.setState({
        orders : data.iOrdersList,
        showEnodeBlist:false,
        showWorkorderHome:true,
        showOrderlist:false
        
    });
  console.log('Data: ', data);
  })
    .catch(error => {
      this.setState({errorMsg:'eNodeB Id Not Found !'});
      console.error('Error', error)});
  }

  //from list need to remove
  getWorkOrderByEnodeBIdFromListHandler = (event,aEnbIdToSearch) => {
    this.getCustomersHandler(aEnbIdToSearch.customerId);
  }

  getEnodeBDownloadHandler = (event) => {
    //event.preventDefault()
    this.resetErrorMsg();
    let mFileName = this.state.enb.enbName+'_'+this.state.enb.softwareVersion+'.xml';
    this.fetchServiceHandler.getWorkorderDownloadService(this.state.enbIdToSearch)
    .then((response) => {
      console.log(response.headers.filename);
      if(response.headers.filename!=='' && response.headers.filename!==undefined){
        mFileName = response.headers.filename;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', mFileName);
      document.body.appendChild(link);
      link.click();
   })
    .catch(e=>{
      console.log(e);

    });

  }

  formValidationHandler=(enb)=>{
    this.resetErrorMsg();
    let returnVal = true;
    return returnVal;
  }


  submitFormHandler = (event) => {
    this.resetErrorMsg();
    let customerOrderForm = {};
    let enbCP = this.state.customers;
    customerOrderForm["iCustomers"] = enbCP; //enodeBElm; //
    customerOrderForm["iOrdersList"] = this.state.orders;
    this.fetchServiceHandler.getSaveWorkOrderSectorService(customerOrderForm)
    .then(response => response.data)//{
    .then(data => {
      this.setState({customers:data.iCustomers});
      console.log('****************')
      data.iOrdersList.forEach((element) => {
          element.id = this.uuidHandler();
          console.log(element.id);
      });

      this.setState({ orders : data.iOrdersList })
      this.setState({errorMsg :"Succesfully Saved/Created"})
      console.log('Data: ', data);
    })
    .catch(error => {
      this.setState({errorMsg :"Failed to Save/Created "})
      console.log("Error:"+error);
  });
    window.scrollTo(0, 0);
  }

  checkTokenExpirationHandler=()=>{
    let isAdmin = localStorage.getItem('admin');

    if(isAdmin===null){
      return false;
    }
    return true;
}

  resetErrorMsg=()=>{
    this.setState({errorMsg :""})
  }

  getEmptyWororderHandler=()=>{
  
      this.setState({ customers : {fname:'',lname:'',address:'',city:'',shopName:'',mobile:''},orders:[] })
      this.setState({ showEnodeBlist:false,showWorkorderHome:true ,showOrderlist:false});
  }

  sideBarHandler=(event)=>{
   switch(Number(event)){
        case 1: history.push('/order');
                history.go();
                break;
        case 2: this.getEmptyWororderHandler();
                break;
        case 3: this.getOrderHandler(event);
                break;
        case 4: //this.getEnodeBDownloadHandler(event);
                break;
        case 5: this.submitFormHandler(event);
                break;
        case 6: this.logOutHandler();
                break;
        case 7: this.logOutHandler();
                break;
        default: break;
    }
  }

logOutHandler = () => {
    this.fetchServiceHandler.getLogoutService();
    history.push('/login');
    history.go();
}

dateDeliveryChangeHandler = (date,id) => {
  this.resetErrorMsg();
  const scIndex = this.state.orders.findIndex(sc => {
    return sc.id === id;
  });
  const sc = {
    ...this.state.orders[scIndex]
  }
  console.log('Id is : ' + id);
  sc['deliveryDate'] = date;
  const scs = [...this.state.orders]
  scs[scIndex] = sc;
  this.setState(
    {
      orders: scs
    }
  )

};


dateOrderChangeHandler = (date,id) => {
  this.resetErrorMsg();
  const scIndex = this.state.orders.findIndex(sc => {
    return sc.id === id;
  });
  const sc = {
    ...this.state.orders[scIndex]
  }
  console.log('Id is : ' + id);
  sc['orderDate'] = date;
  const scs = [...this.state.orders]
  scs[scIndex] = sc;
  this.setState(
    {
      orders: scs
    }
  )

};

render() {
    let secCarriers = null;
    secCarriers = (
      <div>
        {
          this.state.orders.map((sectorCarrier, index) => {
            return (

              <div className="SecCarrier">
                <SectorCarrier
                  orderId = {sectorCarrier.orderId}
                  orderType = {sectorCarrier.orderType}
                  orderDate = {sectorCarrier.orderDate}
                  deliveryDate = {sectorCarrier.deliveryDate}
                  quantity = {sectorCarrier.quantity}
                  perPrice = {sectorCarrier.perPrice}
                  discount = {sectorCarrier.discount}
                  total={sectorCarrier.total}
                  payment = {sectorCarrier.payment}
                  balance = {sectorCarrier.balance}
                  note = {sectorCarrier.note}
                  orderStatus = {sectorCarrier.orderStatus}
                  key = {sectorCarrier.id}
                  startDate = {this.state.startDate}
                  dateOrderChangeHandler = {(event) => this.dateOrderChangeHandler(event, sectorCarrier.id)}
                  dateDeliveryChangeHandler = {(event) => this.dateDeliveryChangeHandler(event, sectorCarrier.id)}
                  changed = {(event) => this.orderChangeHandler(event, sectorCarrier.id)}
                  click = { () => this.deleteOrderHandler(index, sectorCarrier.id)}/>
              </div>
            )
          })
        }
      </div>
    )

    return (    
     
      <div id="woHome">
       
        <Navbar pageWrapId={"page-wrap"} outerContainerId={"woHome"}  onChangedHandler = {(event)=>this.sideBarHandler(event)}  />
       
        <div className='section2'>
        
        { this.state.showOrderlist ? <Orders WorkOrderByEnodeBIdHandler = {this.getWorkOrderByEnodeBIdFromListHandler}/>: null }
        { this.state.showEnodeBlist ? <Home WorkOrderByEnodeBIdHandler = {this.getWorkOrderByEnodeBIdFromListHandler}/>: null }
        { this.state.showWorkorderHome ?
         <form className="form-control-sm" id="woForm"
          onSubmit={this.submitFormHandler} >
           <div className="Workorder">
         
             <label className="errorMsg">{this.state.errorMsg}</label>
              <div className="card">
            
             
              <div className="card-body">
                  <div className="form-row">
                    <div className="col">
                    <label htmlFor="enbId" >First Name</label>
                      <input type="text" onChange= {(event) => this.customerChangeHandler(event)} className="form-control" id="fname" name="fname"
                          value={this.state.customers.fname} placeholder="fname"/>
                   </div>
                    <div className="col">
                      <label htmlFor="enbName">Last Name</label>
                      <input type="text" onChange= {(event) => this.customerChangeHandler(event)} className="form-control" id="lname" name="lname"
                          value={this.state.customers.lname} placeholder="lname"/>
                    </div>
                    <div className="col">
                    <label htmlFor="enbName">Address</label>
                      <input type="text" onChange= {(event) => this.customerChangeHandler(event)} className="form-control" id="address" name="address"
                          value={this.state.customers.address} placeholder="address"/>
                    </div>
                    <div className="col">
                    <label htmlFor="enbName">City</label>
                      <input type="text" onChange= {(event) => this.customerChangeHandler(event)} className="form-control" id="city" name="city"
                          value={this.state.customers.city} placeholder="city"/>
                    </div>
                    <div className="col">
                    <label htmlFor="enbName">Shop Name</label>
                      <input type="text" onChange= {(event) => this.customerChangeHandler(event)} className="form-control" id="shopName" name="shopName"
                          value={this.state.customers.shopName} placeholder="shopName"/>
                    </div>
                    <div className="col">
                    <label htmlFor="enbName">Mobile</label>
                      <input type="text" onChange= {(event) => this.customerChangeHandler(event)} className="form-control" id="mobile" name="mobile"
                          value={this.state.customers.mobile} placeholder="mobile"/>
                    </div>
                    </div>
                  <p> </p>
              </div>
              </div>
              <div className="card">
                <div className="card-header scHeader">
                  Orders &nbsp;<span className="searchIcon"><Icon  icon={plusRound} size={20} onClick= {(event) => this.addOrderHandler()}/> </span>
                 
                </div>
                <div >
                  <div className="scScroller">
                    {secCarriers}
                  </div>
                  <p></p>
                </div>
              </div>

          </div>
        </form>:null
        }
        </div>
      
      </div>
      
    )}
}

export default Workorder;
