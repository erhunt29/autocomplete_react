import React, {Component} from 'react';
import {render} from 'react-dom';
import Autocomplete from "./components/Autocomplete"
import {data} from './data'

const placeholder = 'Select your car'

render(<Autocomplete data = {data} placeholder = {placeholder}/>, document.querySelector('.container'))
