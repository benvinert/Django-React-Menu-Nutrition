import React,{useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { UserContext } from './UserContext';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
    background:'white',
    borderRadius : '5%',
    marginLeft : '20px'
  },
}));

export default function GramsPicker(props) {
  const classes = useStyles();
  const [Grams, SetGrams] = useState('');
  const [open, setOpen] = useState(false);
  const [showerror,setShowerror] = useState(false);
  const foodContext = useContext(UserContext);

  var grams = [];
  var i;
  var cell = -1;
  for(i = 20 ; i <= 300 ;){
        cell++;
        grams[cell] = i;
        i += 20;
  }

  function handleChange(event){
    var val = event.target.value
    SetGrams(val);
    foodContext[1]((prev) => {return {...prev,Grams : val}})
    props.ShowValuesToFalse();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
    
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Grams</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={Grams}
          onChange={handleChange}
          required={true}
          
        >
          <MenuItem value={0}>
            <em>0</em>
          </MenuItem>
          {grams.map((each,index) => {
              return <MenuItem key={index} value={each}>{each}</MenuItem>
          })}
          
        </Select>
      </FormControl>
    </div>
  );
}