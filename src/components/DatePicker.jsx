import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../App.css';
import { YearsData, MonthsData, Calendar } from './index';
const weeks = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
const cuurrentDate = new Date();

export class DatePicker extends Component {
    static propTypes = {
        value: PropTypes.PropTypes.object,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        disabledDays: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            direction: 'left',
            day: null,
            year: null,
            month: null,
            items: null
        };

        this.rightClick = this.moveRight.bind(this);
        this.leftClick = this.moveLeft.bind(this);
        this.getSelectedYear = this.getSelectedYear.bind(this);
        this.getSelectedMonth = this.getSelectedMonth.bind(this);
    }

    componentWillMount() {
        const year = moment(this.props.value ? this.props.value : cuurrentDate, "DD/MM/YYYY").year();
        const month = moment(this.props.value ? this.props.value : cuurrentDate, "DD/MM/YYYY").month();
        const day = moment(this.props.value ? this.props.value : cuurrentDate, "DD/MM/YYYY").date();
        this.setState({
            year: year,
            day: day,
            month: month
        });
        this.setState({items: this.getDaysArray(year, month)});
    }

    getSelectedYear(year) {
        this.setState({year: year});
        this.setState({items: this.getDaysArray(year, this.state.month)});
    }

    getSelectedMonth(month) {
        this.setState({month: month});
        this.setState({items: this.getDaysArray(this.state.year, month)});
    }

    getDaysArray(year, month) {
        let date = new Date(year, month - 1, 1);
        let result = [];
        while (date.getMonth() === month - 1) {
            result.push({day: date.getDate(), week: weeks[date.getDay()]});
            date.setDate(date.getDate() + 1);
        }
        return result;
    };

    moveLeft(data) {
        this.props.onChange(new Date(this.state.month + '/' + this.state.items[data].day + '/' + this.state.year));
    }

    moveRight(data) {
        this.props.onChange(new Date(this.state.month + '/' + this.state.items[data].day + '/' + this.state.year));
    }

    render() {
        return (
            <div className="calender">
                <div>
                <YearsData start={1900} end={2020} getSelectedYear={this.getSelectedYear} selectedYear={this.state.year} {...this.props}/>
                <MonthsData selected={this.state.month} getSelectedMonth={this.getSelectedMonth} {...this.props}/>
                <div id="carousel">
                    <div id="carousel" className="noselect">
                        { this.state.items ? <Calendar slideRight={this.rightClick} active={this.state.day - 1} slideLeft={this.leftClick} items={this.state.items} direction={this.state.direction} disabledDays={this.props.disabledDays}{...this.props} {...this.state}/> : null}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
