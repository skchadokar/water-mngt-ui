import React from 'react';
import {FetchService} from '../helpers/fetch/services/service';
import createHistory from "history/createBrowserHistory";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import * as moment from 'moment';


//const history = createHistory();
class Orders extends React.Component {
  constructor(props) {
    console.log("URL-ER-Nokia=>",window.location.search);
   
    super(props);
    this.state = { 
                  workOrderSummaryList: [],
                  workOrderSummaryListColumnDefs: [
                      {headerName: "Name", field: "customerName", width: 60, suppressSizeToFit: false,cellRendererFramework: this.goToWorkOrderRenderer},
                      {headerName: "Order Type", field: "orderType",width: 55, suppressSizeToFit: false,sortable: true },
                      {headerName: "Order Date", field: "orderDate",width: 60, suppressSizeToFit: false,sortable: true ,cellRenderer: (data) => {
                        return moment(data.orderDate).format('DD/MM/YYYY')
              }},
                      {headerName: "Delivery Date", field: "deliveryDate",width: 60,suppressSizeToFit: false,cellRenderer: (data) => {
                                return moment(data.deliveryDate).format('DD/MM/YYYY')
                      }},
                      {headerName: "Quantity", field: "quantity",width: 40, suppressSizeToFit: false},
                      {headerName: "Per/Price", field: "perPrice",width: 50,suppressSizeToFit: false},
                    
                      {headerName: "Discount", field: "discount",width: 40,suppressSizeToFit: false},
                      {headerName: "Total", field: "total",width: 30, suppressSizeToFit: false},
                      {headerName: "Payment", field: "payment",width: 40,suppressSizeToFit: false},

                      {headerName: "Balance", field: "balance",width: 40,suppressSizeToFit: false},
                      {headerName: "Status", field: "orderStatus",width: 40, suppressSizeToFit: false},
                      {headerName: "Note", field: "note",width: 40,suppressSizeToFit: false}

                      ],

                    rows:100,
                    offsetCount:1,
                    totalPages:1
                }

    this.getOrderHandler = this.getOrderHandler.bind(this);
    this.goToWorkOrderRenderer=this.goToWorkOrderRenderer.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.fetchServiceHandler = new FetchService();
  // this.dateFormaterRenderer=this.dateFormaterRenderer.bind(this);
  }

  componentDidMount() {
   // window.location.assign("http://localhost:3000/home");
   this.getOrderHandler();
  }



  goToWorkOrderRenderer=(params)=>{ 
  return (<span className='linkColor' onClick={(event)=>this.props.WorkOrderByEnodeBIdHandler(event,params.data)}>{params.value}</span>)
 }


  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
}

getOrderHandler=()=>{
  this.fetchServiceHandler.getOrderService()
  .then(response =>{
      console.error('response', response.data);
      this.setState({ workOrderSummaryList : response.data });
 } ).catch(error => console.error('Error', error));


}


  render() {
    return (
      <div id="enodeBHome">
       <div className="Workorder">
      <div className="enodeBGrid">  
        <div className="row">
        <div className="col enodeBHomeGrid">
          <div style={{height: 800, width: '101%', marginTop: 10,fontSize:'13px'}}
                 className="ag-theme-balham" id="enodeBHomeGridId">
                <AgGridReact
                    columnDefs={this.state.workOrderSummaryListColumnDefs}
                    rowData={this.state.workOrderSummaryList}
                    enableFilter={true}
                    onGridReady={this.onGridReady}
                    headerHeight={30}
                    enableSorting={true}
                  //  enableColResize={true}
                    
                    >
                </AgGridReact>
            </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Orders;
