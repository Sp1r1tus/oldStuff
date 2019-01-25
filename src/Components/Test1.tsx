import * as React from 'react';
import { Chart } from 'react-google-charts';

interface IMyCompomentProps {
    test?: string;
    data?: any;
}
interface IMyComponentState {
    message?: string;
}

const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 14
        }
    },
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};

class Test1 extends React.Component<IMyCompomentProps, IMyComponentState> {
    constructor(props: IMyCompomentProps) {
        super(props);
        this.state = {
            message: '1'
        };
    }

    public componentDidMount() {
        setTimeout(() => {
            this.setState({ message: 'OnDemo' });
        }
            , 2000);
    }

    public render() {
        return (
            <div>
                <Chart
                    chartType="PieChart"
                    data={[["Age", "Weight"], ["a", 12], ["b", 5.5], ["c", 10], ["d", 10]]}
                    options={pieOptions}
                    graph_id="PieChart"
                    width={"100%"}
                    height={"400px"}
                />
                <Chart
                    chartType="ScatterChart"
                    data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                    width="100%"
                    height="400px"
                />
                <span>{this.props.test}</span>
                <span>bla bla bla</span>
                <span>{this.state.message}</span>
            </div>
        );
    }
}

export default Test1;