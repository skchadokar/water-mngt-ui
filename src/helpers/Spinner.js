import React from 'react';
import { css } from '@emotion/core';

// Another way to import
import FadeLoader from 'react-spinners/FadeLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
      }
    
    render() {
     return(
      <div className='sweet-loading'>
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={180}
          color={'#0D7DFC'}
          loading={this.props.isLoader}
        />
       {this.props.isLoader?<span className="loder-msg"> Operations are in progress, please wait...</span>:null}
    </div> 
     );
    }
 }