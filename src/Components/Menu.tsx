import * as React from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';

import '../main_styles.css';

class Menu extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div className="ms-Grid" dir="ltr">
                    <div>
                        <div className="ms-Grid-row" >
                            <div className="ms-Grid-col ms-lg6">
                                <CompoundButton
                                    iconProps={{ iconName: 'DonutChart' }}
                                    primary={false}
                                    secondaryText="Testing1"
                                    href="./Test1">
                                    Projects
                                </CompoundButton>
                            </div>
                            <div className="ms-Grid-col ms-lg6">
                                <CompoundButton
                                    iconProps={{ iconName: 'Database' }}
                                    primary={true}
                                    secondaryText="Testing2"
                                    href="./Test2">
                                    Testing
                                </CompoundButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;