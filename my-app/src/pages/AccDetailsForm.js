import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const options = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };


export default class AccDetailsForm extends Component{
  handleLAN = (event) =>{
      this.setState({firstName: event.target.value});
      this.props.onSelLan(event.target.name,event.target.value);
  }
    render(){
        return (
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Complete your profile
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    value={this.props.val.firstName}
                    onChange={this.handleLAN}
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    value={this.props.val.lastName}
                    onChange={this.handleLAN}
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    value={this.props.val.address1}
                    onChange={this.handleLAN}
                    label="Address line 1"
                    fullWidth
                    autoComplete="billing address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    value={this.props.val.address2}
                    onChange={this.handleLAN}
                    label="Address line 2"
                    fullWidth
                    autoComplete="billing address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    value={this.props.val.city}
                    onChange={this.handleLAN}
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <FormControl>
                    <InputLabel required>State</InputLabel>
                    <Select
                        value={this.props.val.dropSelection}
                        onChange={this.handleLAN}
                        style={{minWidth: 120}}
                        MenuProps={MenuProps}
                        inputProps={{
                        name: 'dropSelection',
                        }}
                    >
                        <MenuItem value="" style={{}}>
                        <em>None</em>
                        </MenuItem >
                        {options.map(opp => (
                            <MenuItem value={opp} key={opp}>{opp}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    value={this.props.val.zip}
                    onChange={this.handleLAN}
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          );
    }
}

  

