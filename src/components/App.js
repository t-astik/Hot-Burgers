import React from 'react';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';  
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    state = {
        burgers: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;

        const loclaStorageRef = localStorage.getItem(params.restaurantId);
        if(loclaStorageRef) {
            this.setState({ order: JSON.parse(loclaStorageRef) });
        }
        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
    }

    componentDidUpdate() {
        const { params } = this.props.match;

        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addBurger = (burger) => {
        console.log(burger);
        const burgers = {...this.state.burgers};
        burgers[`burger${Date.now()}`] = burger;
        this.setState({ burgers }); 
    };

    updateBurger = (key, updatedBurger) => {
        const burgers = {...this.state.burgers};
        burgers[key] = updatedBurger;
        this.setState({ burgers });
    };

    deleteBurger = (key) => {
        const burgers = {...this.state.burgers};
        burgers[key] = null;
        this.setState({ burgers });
    };
    
    loadSampleBurgers = () => {
        this.setState({ burgers: sampleBurgers });
    };

    addToOrder = key => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    };

    deleteFromOrder = key => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    };

    render() {
        return (
       //по словам автора:
       <div className='burger-paradise'>
           <div className='menu'>
               <Header title="Hot Burger" />
               <ul className='burgers'>
                   {Object.keys(this.state.burgers).map(key => {
                       return <Burger 
                       key={key} 
                       index={key}
                       addToOrder={this.addToOrder}
                       details={this.state.burgers[key]}
                       />;
                   })}
               </ul>
           </div>
           <Order 
           burgers={this.state.burgers} 
           order={this.state.order} 
           deleteFromOrder={this.deleteFromOrder}
           />
           <MenuAdmin 
            addBurger={this.addBurger} 
            loadSampleBurgers = {this.loadSampleBurgers}
            burgers={this.state.burgers}
            updateBurger={this.updateBurger}
            deleteBurger={this.deleteBurger}
           />
       </div>    
        );
    }
}

export default App;