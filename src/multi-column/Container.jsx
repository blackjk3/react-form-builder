/* eslint-disable no-tabs */
import React from 'react';
import Dustbin from './dustbin';
import Card from './card';

const Container = () => (
	<div>
		<div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <div className="row">
        <div className="col-md-6" style={{ zIndex: 1000 }}>
          <Dustbin greedy={true}>
            <Dustbin greedy={true} />
          </Dustbin>
        </div>
        <div className="col-md-6">
          <Dustbin>
            <Dustbin />
          </Dustbin>
        </div>
      </div>
		</div>

		<div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
			<Card />
		</div>
	</div>
);

export default Container;
