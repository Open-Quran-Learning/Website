import React, { Component } from 'react';

class ProgramCreation extends Component {
    state = {  }

    render() { 
        return (
            <div>
                <label for="programName">اسم البرنامج</label>
                <input type="text" id="programName"></input>
            </div>
        );
    }
}
 
export default ProgramCreation;