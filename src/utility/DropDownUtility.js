import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const [species, setSpecies] = React.useState('');

    useEffect(async () => {
        axios.get('https://swapi.dev/api/species')
            .then(res => {
                const speciesData = res.data.results;
                console.log(speciesData)
                setSpecies(speciesData);
            })
    }, [])

    const handleChange = (event) => {
        console.log(event);
        setSpecies(event.target.value);
    };

    return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">{species && species[0].name}</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={(e) => handleChange(e)}>
                    {species && species.map((res) =>
                        <MenuItem value={res.name}>{res.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}