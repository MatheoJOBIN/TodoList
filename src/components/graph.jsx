import React from 'react';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            options: {},
            data: {},
        }
    }

    register() {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        )
    }

    componentWillMount(){
        console.log("props authorList ",this.props.authorList)
        this.register();
        console.log(this.props);
        var label = [];
        this.props.authorList.map((author) => {
            label = [...label, author.value.Nom]
            console.log("COUCOU !!!!!! " ,label, author.value.Nom);
        })
        console.log(label);

        var option = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },
            },
        };

        var datas = {
            labels: label,
            datasets: [{
                label: 'Dataset 1',
                data: label.map(() => Math.floor(Math.random() * 1000 + 1)),
                fill: true,
                fillColor: "rgba(0,10,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(200, 99, 132)',
                tension: 0.3,
            }
            ],
        }

        this.setState({
            options: option, 
            data: datas,
            authorList : this.props.authorList
        })
        this.render();
    }
    componentDidMount() {
        this.render();
    }
    componentDidUpdate() {
        this.render();
    }

    render() {
        return (
            console.log("States ",this.state),
            <Line data={this.state.data} options={this.state.options} />
        )
    }
}