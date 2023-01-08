import Chart from "react-apexcharts";

const Charts = (props) => {

    const yLabel = props.title
    const gTitle = props.title
    const min = 0
    const max = 100
    const first = Date.parse('30 Nov 2022 23:47:00 GMT');
    const second = Date.parse('30 Nov 2022 23:42:00 GMT');
    const third = Date.parse('30 Nov 2022 23:37:00 GMT');
    let YAXIS = {
        title: {
            text: yLabel
        },
    }
    if(yLabel=="CPU Utilisation(%)") {
        YAXIS = {
            min: 0,
            max: 100,
            title: {
                text: yLabel
            },
        }
    }
    const st = {

        series: [{
            name: 'hmm',
            data: props.data
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: gTitle,
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: YAXIS,
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                enabled: false
            }
        },


    };

    return (
        <div id="chart">
            <Chart options={st.options} series={st.series} type="area" height={350} />
        </div>);

}
export default Charts;

//