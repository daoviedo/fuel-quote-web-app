import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Username/Password
      </Typography>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            style={{width: "35%",paddingBottom:"14px"}}
            margin="dense"
          />
          <br/>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            style={{width: "35%",paddingBottom:"30px"}}
            type="password"
            margin="dense"
          />
    </React.Fragment>
  );
}

export default AddressForm;