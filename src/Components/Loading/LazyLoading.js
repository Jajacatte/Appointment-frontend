import React from 'react'
import "./Loading.css"; // Import CSS for styling
const LazyLoading = () => {
  return (
    <div className='w-100 lazy d-flex justify-content-center align-items-center'>
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LazyLoading
