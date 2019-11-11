import React from 'react';
import { Icon } from 'react-icons-kit';
import {trash} from 'react-icons-kit/iconic/trash'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const sectorCarrier = (props) => {
  return (
    <div className="SectorCarrier">
        <div>
          <input type="hidden" value={props.orderId}/>
         </div>
        <div className="col">
              <div className="row">

              <div className="col">
                  <label htmlFor="freqblock">Order Type </label>
                  <select onChange={props.changed} value={props.orderType} className="form-control" id="orderType" name="orderType">
                    <option>select</option>
                    <option>Bottel(20L)</option>
                    <option>Can(Cold)</option>
                  </select>
                </div>

                  <div className="col">
                    <label htmlFor="cellId">Order Date</label>
                    <DatePicker
                        selected={props.orderDate==="" || props.orderDate===null ? new Date() : new Date(props.orderDate)}
                        onChange={props.dateOrderChangeHandler}
                        id={"orderDate"}
                        name={"orderDate"}
                        dateFormat="dd/MM/yyyy"
                      />
                   
                  </div>
               
                  <div className="col">
                    <label htmlFor="cellId">Delivery Date</label>
                 
                    <DatePicker
                        selected={props.deliveryDate==="" || props.deliveryDate===null ? new Date(props.orderDate) : new Date(props.deliveryDate)}
                        onChange={props.dateDeliveryChangeHandler}
                        id={"deliveryDate"}
                        name={"deliveryDate"}
                        dateFormat="dd/MM/yyyy"
                      >
                       <div style={{ color: "red" }}>Delivery Date should be more/equal than Order Date </div>
                    </DatePicker>               
                   </div>

                <div className="col">
                  <label htmlFor="pci">Quantity</label>
                  <input type="number" min="0" onChange={props.changed} value={props.quantity} className="form-control" id="quantity" name="quantity" placeholder="quantity" required/>
                </div>
                <div className="col">
                  <label htmlFor="rsi">Price/Order</label>
                  <input type="number" min="0" onChange={props.changed} value={props.perPrice} className="form-control" id="perPrice" name="perPrice" placeholder="per price" required/>
                </div>
               
               
                <div className="col">
                  <label htmlFor="tac">Discount</label>
                  <input type="number" min="0" onChange={props.changed} value={props.discount} className="form-control" id="discount" name="discount" placeholder="discount" />
                </div>
                <div className="col">
                  <label htmlFor="eai">Total</label>
                  <input type="number" min="0" onChange={props.changed} value={props.total} className="form-control" id="total" name="total" placeholder="total" readOnly/>
                </div>

               
                <div className="col">
                  <label htmlFor="tac">Payment</label>
                  <input type="number" min="0" onChange={props.changed} value={props.payment} className="form-control" id="payment" name="payment" placeholder="payment" />
                </div>

                <div className="col">
                  <label htmlFor="tac">Balance</label>
                  <input type="number" min="0" onChange={props.changed} value={props.balance} className="form-control" id="balance" name="balance" placeholder="balance" readOnly />
                </div>


                <div className="col">
                  <label htmlFor="tac">Note</label>
                  <input type="text"  onChange={props.changed} value={props.note} className="form-control" id="note" name="note" placeholder="NA" />
                </div>

                <div className="col">
                  <label htmlFor="tac">Status</label>  <span className='delIcon' onClick={props.click}> <Icon  icon={trash} size={22}/></span>
                  <select onChange={props.changed} value={props.orderStatus} className="form-control" id="orderStatus" name="orderStatus">
                    <option>select</option>
                    <option>Open</option>
                    <option>Close</option>
                  </select> 
                
               </div>

              
              </div>
        </div>
        <br/>
    </div>
  )
}

export default sectorCarrier;
