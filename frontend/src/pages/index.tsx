import React from 'react';
import Grid from '../components/Grid/Grid';


const Home: React.FC = () => {
  return (
    <div className='container'>
      <h1>Your Personal Staking Calculator</h1>
      <Grid rows={9} columns={3} />
    </div>
  );
};


export default Home;
