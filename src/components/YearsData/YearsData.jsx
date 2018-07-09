import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './yearsData.css';
import arrow from '../../images/arrow.svg';

export class YearsData extends Component {
    static propTypes = {
        start: PropTypes.number,
        end: PropTypes.number,
        getSelectedYear: PropTypes.func,
        selectedYear: PropTypes.number,
        disabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            start: this.props.start,
            end: this.props.end,
            selected: this.props.selectedYear
        }
    }

    increment() {
        this.setState({selected: this.state.selected + 1});
        this.props.getSelectedYear(this.state.selected + 1);
    }

    decrement() {
        this.setState({selected: this.state.selected - 1});
        this.props.getSelectedYear(this.state.selected - 1);
    }

    render() {
        return (
            <div className="years">
                <span className="left" onClick={!this.props.disabled ? this.decrement.bind(this) : null}><img src={arrow} alt=""/></span>
                <span>{this.state.selected}</span>
                <span className="right" onClick={!this.props.disabled ? this.increment.bind(this): null}><img src={arrow} alt=""/></span>
            </div>
        );
    }
}

