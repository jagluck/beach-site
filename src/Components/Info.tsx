import React from 'react';

// interface Info {
//   showSeeds: boolean;
// }

class Info extends React.Component {
  // constructor(props: any) {
  //     super(props);
  //     this.showSeeds = true;
  // }

  render() {
    return (
      <div className="Info">
        <span>Winter Fun!!</span>
        {/* <br></br>
          <br></br>
          <span>Show Seeds?</span>
          <input type="checkbox" name="showSeeds" /> */}
      </div>
    );
  }
}

export default Info;