import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import Menu from './Components/Menu'
import Test1 from './Components/Test1';
import Test2 from './Components/Test2';



import './main_styles.css';

initializeIcons();

interface IMyCompomentState {
    menu: any;
}

interface IMyCompomentProps {
    data?: any;
}

class App extends React.Component<IMyCompomentProps, IMyCompomentState> {
    constructor(props: IMyCompomentProps) {
        super(props);
        this.state = {
            menu: [],
        };
    }

    public componentDidMount() {
        this.getMenu();
    }

    public getMenu = () => {
        fetch('http://localhost:4000/Menu/') // localhost 4000 is the Backend Repo on my Git. in Menu there are the dynamic data from SQL
            .then(response => response.json())
            //  .then(response => {
            //    console.log(response)
            //    return response.json();
            //  })
            // .then(response => {
            //    console.log(response)
            //    console.log(response.data.recordset)
            // })
            .then(response => this.setState({ menu: response.data.recordset }))
            .catch(err => console.error(err))
    };


    public render() {
      
        return (
            <div>
                <div className="HeaderBar">
                    <a href="/"><img className="Logo" src={require('./img/logo.png')} /></a>
                </div>

                <div className="NavBar" >
                    <Nav groups={[{ links: this.state.menu }]} />
                </div>
                <div className="Content">
                    <BrowserRouter>
                        <div>
                            <Route exact={true} path="/" component={Menu} />

                            <Route path="/Test1" component={Test1} />

                            <Route path="/Test2" component={Test2} />

                        </div>
                    </BrowserRouter>

                </div>
            </div>
        );
    }
}

export default App;