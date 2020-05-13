import React, { useContext, useEffect } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { StarWarContext } from '../context/CreateContext'
import { Loading } from '../utility/Loader';
import axios from 'axios'

const colors = scaleOrdinal(schemeCategory10).range();

const data = []

export default function ScatterPlot() {
    const [selectedSpeciesObj] = useContext(StarWarContext);
    const [loading, setLoading] = React.useState(false);
    const [data, setData]=React.useState([]);

    
      useEffect(()=>{
        setData(data)
      })

    useEffect(() => {
        loadPeople();
    }, [selectedSpeciesObj])

    const loadPeople = () => {
        let peopleResponse = [];
        setLoading(true);
        selectedSpeciesObj && selectedSpeciesObj.people.forEach(url => {
            peopleResponse.push(getPeopleData(url))
        })
        Promise.all(peopleResponse).then(allPeopleData => {
            let data=[];
            let selectedPeopleData = (allPeopleData.flat());
            setLoading(false);
            selectedPeopleData && selectedPeopleData.map((res)=>{
           data.push({ x: res.height, y: res.mass ,name:res.name, gender:res.gender});
           setData(data)
           console.log(data)
            })
        }).catch((err) => {
            console.log("Something went wrong. Please try again");
            setLoading(false);
        })
    }

    const getPeopleData = (url) => {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            })
        }

    return (
        <ScatterChart
            width={500}
            height={500}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <XAxis type="number" dataKey="x" name="height" unit="cm" />
            <YAxis type="number" dataKey="y" name="mass" unit="kg" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} label="priyanka"/>
            <Scatter name="A school" data={data} fill="#8884d8">
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                }
            </Scatter>
        </ScatterChart>
    );

}