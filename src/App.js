import React, { Component } from 'react';
import './App.css';
import { DatePicker } from './components/DatePicker';

class App extends Component {

    selectedDate = (value) => {
      console.log('selected date====', value);
    };

  render() {
      const nowDate = new Date();
      const disabledValue = [new Date('7/3/2018')];
    return (
      <div className="App">
        <DatePicker onChange={this.selectedDate} value={nowDate} disabledDays={disabledValue} />
      </div>
    );
  }
}

export default App;
