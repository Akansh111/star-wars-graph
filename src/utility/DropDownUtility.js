import React, { useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Loading } from './Loader';
import { SPECIES_URL } from '../constants/constants';

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
    const [selectedSpeciesObj, setSelectedSpeciesObj] = React.useState();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        loadSpecies();
    }, [])

    const loadSpecies = () => {
        let speciesResponse = [];
        setLoading(true);
        SPECIES_URL.forEach(url => {
            speciesResponse.push(getData(url));
        })

        Promise.all(speciesResponse).then(allSpeciesData => {
            setSpecies(allSpeciesData.flat());
            setSelectedSpeciesObj(allSpeciesData[0][0]);
            setLoading(false);
        }).catch((err) => {
            console.log("Something went wrong. Please try again");
            setLoading(false);
        })

    }

    const getData = (url) => {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    resolve(res.data.results);
                }).catch((err) => {
                    reject(err);
                })
        })
    }


    const handleChange = (event) => {
        setSelectedSpeciesObj(species.find(selected => selected.name === event.target.value));
    };

    return (
        <div>
            {
                !loading ?
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">{selectedSpeciesObj ? selectedSpeciesObj.name : ''}</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={species}
                            onChange={(e) => handleChange(e)}>
                            {species && species.map((res, index) =>
                                <MenuItem key={index} value={res.name}>{res.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl> :
                    <Loading />
            }

        </div>
    );
}