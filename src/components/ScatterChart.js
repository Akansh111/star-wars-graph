// *** scatterChart component showing plot of species from star wars univerese *** //

import React, { useContext, useEffect ,useState} from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell, Label
} from 'recharts';
import axios from 'axios';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { StarWarContext } from '../context/CreateContext'
import { Loading } from '../utility/Loader';
import './StarWarsStyle.css';
import { ErrorTemplate } from '../utility/ErrorTemplate'


const colors = scaleOrdinal(schemeCategory10).range();

export default function ScatterPlot() {
    const [selectedSpeciesObj] = useContext(StarWarContext);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);


    useEffect(() => {
        loadPeople();
    }, [selectedSpeciesObj])


    //  loading people data   // 

    const loadPeople = () => {
        let peopleResponse = [];
        setLoading(true);
        selectedSpeciesObj && selectedSpeciesObj.people.forEach(url => {
            peopleResponse.push(getPeopleData(url))
        })
        Promise.all(peopleResponse).then(allPeopleData => {
            let data = [];
            allPeopleData && allPeopleData.forEach((res) => {
                //setting the 'unknown' value in data to 0 so as to plot the point //
                const height = res.height !== 'unknown' ? res.height : 0;
                const mass = res.mass !== 'unknown' ? res.mass : 0;
                data.push({ x: height, y: mass, z: res.name, a: res.gender, b: res.mass });
                setChartData(data);
            })
            setLoading(false);
        }).catch((err) => {
            setErrorMessage(true);
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

    // custom ToolTip to show details of plotted points //

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <div>
                        <p className="name"><b>Name</b>: {payload[0].payload.z}</p>
                        <p className="gender"><b>Gender</b>: {payload[0].payload.a}</p>
                        <p className="height"><b>Height</b>: {payload[0].value}</p>
                        <p className="mass"><b>Mass</b>: {payload[0].payload.b}</p>
                    </div>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="card plot-card">
            <div className="card-body ">
                {errorMessage ? <ErrorTemplate value="Fetch People data failed" /> :
                    !loading ?
                        <ScatterChart
                            width={500}
                            height={500}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <XAxis type="number" dataKey="x" name="height" unit="cm">
                                <Label value="Height" position="center" style={{ textAnchor: 'middle' }} offset={100} />
                            </XAxis>
                            <YAxis type="number" dataKey="y" name="mass" unit="kg">
                                <Label value="Mass" position="left" style={{ textAnchor: 'middle' }} offset={10} angle={270} />
                            </YAxis>

                            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                            <Scatter data={chartData} fill="#8884d8">
                                {
                                    chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                                }
                            </Scatter>
                        </ScatterChart> : <Loading />
                }
            </div>
        </div>
    );

}