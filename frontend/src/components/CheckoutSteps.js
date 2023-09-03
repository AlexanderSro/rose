import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';


const DynamicProgressBar = () => {

  return (
    <div className="justify-content-center my-3">
      <ProgressBar>
        <ProgressBar
          label={"Informatii"}
          animated
          variant="info"
          now={34}
          key={1}
        />
        <ProgressBar
          label={"Transport"}
          animated
          variant="warning"
          now={34}
          key={2}
        />
        <ProgressBar
          label={"Plata"}
          animated
          variant="danger"
          now={34}
          key={3}
        />
      </ProgressBar>
    </div>
  );
};

export default DynamicProgressBar;
