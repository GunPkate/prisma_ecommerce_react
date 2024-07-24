import BackOffice from "../../components/BackOffice";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js'

  
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend )



export default function Dashboard(){
    const data = {
        labels: ['1','2','3'],
        datasets: [{
            label: 'Monthly Sale',
            data: [10,20,30],
            backgroundColor:  'rgba(75,102,102,0.2)',
            borderWidth: 1

        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Monthly Sale'
            },
            scales: {
                y: {beginAtZero: false}
            }
        }
    }

    return <BackOffice>
        <Bar data={data} options={options}/>
    </BackOffice>
}