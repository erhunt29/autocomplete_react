import React, {Component} from 'react';

export default class Autocomplete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataAll: [],
            value: '',
            isOpen: false
        }

        this.focusOut= this.focusOut.bind(this);
    }

    render() {
        const {placeholder} = this.props
        const {value} = this.state;
        return (
            <div>
                <input className={'autocomplete__input'}
                       onChange= {evt => this.filterList(evt)}
                       onClick= {evt => this.filterList(evt)}
                       onBlur={this.focusOut}
                       value= {value}
                       placeholder = {placeholder}/>

                {this.openList()}
            </div>
    )
    }

    openList() {
        const {dataAll,isOpen} = this.state;
        const classNameShort = (dataAll.length > 4) ? 'autocomplete__list_short' : ''
        const classNameVisually = (!isOpen) ? 'hidden ' : ''
        let elements = dataAll.map(el => {
            return (
                <div className={'autocomplete__list__li'}
                     onClick={evt => this.inputValue(evt)}
                     key = { el }>
                    {el[0]}
                    <b key={el[1]}>{el[1]}</b>
                    {el[2] }
                </div>)
        })


        return (
                <div className = {'autocomplete__list' + ' ' + classNameShort + ' ' + classNameVisually}>
                    {elements}
                </div>
            )

    }

    inputValue(evt) {
        let value = evt.target.innerHTML;
        const boldIndexStart = value.indexOf('<b>');
        const boldIndexEnd = value.indexOf('</b>');

        if (boldIndexStart !== -1) {
            value =  value.slice(0,boldIndexStart) +
                value.slice(boldIndexStart + 3 ,boldIndexEnd) +
                value.slice(boldIndexEnd + 4,value.length);
        }

        this.setState({
            value: value,
            isOpen: false
        })
    }

    filterList(evt) {
        const {data} = this.props;
        const value = evt.target.value;
        const arrFiltred = data.filter( el => el.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        const arrBoldValue = arrFiltred.map( el => {
            const index = el.toLowerCase().indexOf(value.toLowerCase());
            const endIndex = index + value.length;
            const lastIndex = el.length

            const startString = el.slice(0, index);
            const boldString = el.slice(index,endIndex);
            const lastString = el.slice(endIndex, lastIndex);

            return [startString,boldString,lastString]
        })
        this.setState({
            dataAll: arrBoldValue,
            value:value,
            isOpen: true
        })
    }

    focusOut() {
       setTimeout(() => this.setState({ isOpen: false }), 10 );
    }
}
