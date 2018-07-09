import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './MonthsData.css';
import arrow from '../../images/arrow.svg';
const NowDate = moment(new Date(), 'YYYY/MM/DD');

export class MonthsData extends Component {
    static propTypes = {
        selected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        getSelectedMonth: PropTypes.func,
        disabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            data: moment.months(),
            selected: ''
        };
    }

    componentWillMount() {
        if(typeof this.props.selected === 'string') {
            this.setState({selected: this.state.data.indexOf(this.props.selected)});
        }else if(typeof this.props.selected === 'number') {
            this.setState({selected: this.props.selected - 1});
        }else {
            this.setState({selected: NowDate.format('M') - 1});
        }
    }

    increment() {
        if (this.state.selected > 10 ) {
            this.setState({selected: 0});
            this.props.getSelectedMonth(1);
        }else {
            this.setState({selected: this.state.selected + 1});
            this.props.getSelectedMonth(this.state.selected + 2);
        }
    }

    decrement() {
        if (this.state.selected === 0 ) {
            this.setState({selected: 11});
        }else {
            this.setState({selected: this.state.selected - 1});
        }
        this.props.getSelectedMonth(this.state.selected);

    }

    render() {
        return (
            <div className="years">
                <span className="left" onClick={!this.props.disabled ? this.decrement.bind(this) : null}><img src={arrow} alt="" /></span>
                <span>{this.state.data[this.state.selected]}</span>
                <span className="right" onClick={!this.props.disabled ? this.increment.bind(this) : null}><img src={arrow} alt=""/></span>
            </div>
        );
    }
}

