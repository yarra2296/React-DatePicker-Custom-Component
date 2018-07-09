import React  from 'react';
import './calendar.css';
import moment from 'moment';

export class CalendarComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            level: this.props.level,
            disabledClick: false
        };
    }

    componentWillMount() {
        if (this.props.disabledDays && this.props.disabledDays.length > 0) {
            this.setState({disabledClick: false});
            this.props.disabledDays.map((data) => {
                const day = moment(data, "DD/MM/YYYY").date();
                if(this.props.id.day === day && moment(data, "DD/MM/YYYY").year() === this.props.year && moment(data, "DD/MM/YYYY").month() === this.props.month) {
                    this.setState({disabledClick: true});
                }
                return null;
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props !== nextProps){
            this.setState({
                level: nextProps.level
            });
            if (nextProps.disabledDays && nextProps.disabledDays.length > 0) {
                this.setState({disabledClick: false});
                nextProps.disabledDays.map((data) => {
                    const day = moment(data, "DD/MM/YYYY").date();
                    if(nextProps.id.day === day && moment(data, "DD/MM/YYYY").year() === nextProps.year && moment(data, "DD/MM/YYYY").month() === nextProps.month) {
                        this.setState({disabledClick: true});
                    }
                    return null;
                });
            }

            this.forceUpdate();
            return true;
        }else if(nextState !== this.state){
            this.setState({
                level: nextState.level
            });

            if (nextState.disabledDays && nextState.disabledDays.length > 0) {
                nextState.disabledDays.map((data) => {
                    const day = moment(data, "DD/MM/YYYY").date();
                    if(nextState.id.day === day && moment(data, "DD/MM/YYYY").year() === moment(nextState.value, "DD/MM/YYYY").year()) {
                        this.setState({disabledClick: true});
                    }
                    return null;
                });
            }

            this.forceUpdate();
            return true;
        }
        return false;
    }

    render() {
        const className = 'item level' + this.props.level;
        return(
            <div className={className + (this.state.disabledClick ? ' disable' : '')} onClick={!this.props.disabled && !this.state.disabledClick ? this.props.level > 0 && this.props.level !== 0 ?
                                                    this.props.leftDateClick.bind(this, this.props.level) :
                                                    this.props.level < 0 && this.props.level !== 0 ?
                                                    this.props.rightDateClick.bind(this, this.props.level) : null
                                                 : null}>
                <span>{this.props.id.day}</span>
                <span>{this.props.id.week}</span>

            </div>
        )
    }
}
