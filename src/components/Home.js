import React from 'react';
import {FetchService} from '../helpers/fetch/services/service';
import createHistory from "history/createBrowserHistory";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';


//const history = createHistory();
class Home extends React.Component {
  constructor(props) {
    console.log("URL-ER-Nokia=>",window.location.search);
   
    super(props);
    this.state = { 
                  workOrderSummaryList: [],
                  workOrderSummaryListColumnDefs: [
                      {headerName: "First Name", field: "fname", width: 60, suppressSizeToFit: false,cellRendererFramework: this.goToWorkOrderRenderer},
                      {headerName: "Last Name", field: "lname",width: 60, suppressSizeToFit: false},
                      {headerName: "Address", field: "address",width: 60, suppressSizeToFit: false},
                      {headerName: "City", field: "city",width: 60,suppressSizeToFit: false},
                      {headerName: "ShopName", field: "shopName",width: 60, suppressSizeToFit: false},
                      {headerName: "Mobile", field: "mobile",width: 60,suppressSizeToFit: false},
                      {headerName: "Action",  width: 60, cellRendererFramework: this.custUpdateRowImgRanderer}
                      ],

                    rows:100,
                    offsetCount:1,
                    totalPages:1
                }

    this.getCustomerHandler = this.getCustomerHandler.bind(this);
    this.goToWorkOrderRenderer=this.goToWorkOrderRenderer.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.fetchServiceHandler = new FetchService();
  }

  componentDidMount() {
   // window.location.assign("http://localhost:3000/home");
   this.getCustomerHandler();
  }
 
  goToWorkOrderRenderer=(params)=>{ 
  return (<span className='linkColor' onClick={(event)=>this.props.WorkOrderByEnodeBIdHandler(event,params.data)}>{params.value}</span>)
 }


  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
}

getCustomerHandler=()=>{
  this.fetchServiceHandler.getCustomerService()
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
          <div style={{height: 800, width: '101%', marginTop: 10,fontSize:'14px'}}
                 className="ag-theme-balham" id="enodeBHomeGridId">
                <AgGridReact
                    columnDefs={this.state.workOrderSummaryListColumnDefs}
                    rowData={this.state.workOrderSummaryList}
                    enableFilter={true}
                    onGridReady={this.onGridReady}
                    headerHeight={30}
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

export default Home;
