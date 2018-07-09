import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import arrow from '../../images/arrow.svg';
import './calendar.css';
import { CalendarComp } from './CalendarComp';

export class Calendar extends Component {
    static propTypes = {
        items: PropTypes.array,
        active: PropTypes.number,
        direction: PropTypes.string,
        slideLeft: PropTypes.func,
        slideRight: PropTypes.func,
        disabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: this.props.direction
        };
        this.rightClick = this.moveRight.bind(this);
        this.leftClick = this.moveLeft.bind(this);
        this.leftDateClick = this.leftDateClick.bind(this);
        this.rightDateClick = this.rightDateClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props !== nextProps) {
            this.setState({
                items: nextProps.items,
                active: nextProps.active,
                direction: nextProps.direction
            });
            this.forceUpdate();
            return true;
        }else if (this.state !== nextState) {
            this.setState({
                items: nextState.items,
                active: nextState.active,
                direction: nextState.direction
            });
            this.forceUpdate();
            return true;
        }
        return false;
    }

    moveLeft() {
        let newActive = this.state.active;
        newActive--;
        let activeValue = newActive < 0 ? this.state.items.length - 1 : newActive;
        let disabledDaysArray = [];
        let month = null;
        let year = null;

        if (this.props.disabledDays && this.props.disabledDays.length > 0) {
            this.props.disabledDays.map((data) => {
                const day = moment(data, "DD/MM/YYYY").date();
                disabledDaysArray.push(day);
                month = moment(data, "DD/MM/YYYY").month();
                year = moment(data, "DD/MM/YYYY").year();
                return null;
            });
        }
        disabledDaysArray.map((a) => {
            if(disabledDaysArray.indexOf(this.state.items[activeValue].day) > -1 && year === this.props.year && month === this.props.month) {
                activeValue--;
                activeValue = activeValue < 0 ? this.state.items.length - 1 : activeValue;
            }
        });

        this.setState({
            active: activeValue,
            direction: 'left'
        });
        this.props.slideLeft(activeValue);
    }

    moveRight() {
        let newActive = this.state.active;
        let activeValue = (newActive + 1) % this.state.items.length;
        let disabledDaysArray = [];
        let month = null;
        let year = null;

        if (this.props.disabledDays && this.props.disabledDays.length > 0) {
            this.props.disabledDays.map((data) => {
                const day = moment(data, "DD/MM/YYYY").date();
                disabledDaysArray.push(day);
                month = moment(data, "DD/MM/YYYY").month();
                year = moment(data, "DD/MM/YYYY").year();
                return null;
            });
        }
        disabledDaysArray.map((a) => {
            if(disabledDaysArray.indexOf(this.state.items[activeValue].day) > -1 && year === this.props.year && month === this.props.month) {
                activeValue = (activeValue + 1) % this.state.items.length;
            }
        });

        this.setState({active: activeValue});
        this.setState({direction: 'right'});
        this.props.slideRight(activeValue);
    }

    leftDateClick(val) {
        let newActive = this.state.active - val;
        let activeValue = newActive < 0 ? this.state.active < val ? ( this.state.items.length + this.state.active - val) : this.state.items.length - val : newActive;
        this.setState({
            active: activeValue,
            direction: 'left'
        });
        this.props.slideLeft(activeValue);
    }

    rightDateClick(val) {
        let newActive = this.state.active - val - 1;
        let activeValue = (newActive + 1) % this.state.items.length;
        this.setState({active: activeValue});
        this.setState({direction: 'right'});
        this.props.slideRight(activeValue);
    }

    generateItems() {
        let items = [];
        let level;
        for (let i = this.state.active - 3; i < this.state.active + 4; i++) {
            let index = i;
            if (i < 0) {
                index = this.state.items.length + i;
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length;
            }
            level = this.state.active - i;
            items.push(<CalendarComp key={index} id={this.state.items[index]} level={level} leftDateClick={this.leftDateClick} rightDateClick={this.rightDateClick} {...this.props}/>);
        }
        return items;
    }

    render() {
        return (
            <div>
                <div className="arrow arrow-left" onClick={!this.props.disabled ? this.leftClick : null}><img src={arrow} alt="" /></div>
                <ReactCSSTransitionGroup
                    transitionName={this.state.direction}
                    transitionEnterTimeout={0.001}
                    transitionLeaveTimeout={0.001}>
                    {this.generateItems()}
                </ReactCSSTransitionGroup>
                <div className="arrow arrow-right" onClick={!this.props.disabled ? this.rightClick : null}><img src={arrow} alt="" /></div>
            </div>
        );
    }
}

