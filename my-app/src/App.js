import logo from './logo.png';
import './App.css';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import inventories from './inventory.json';
import Home from './Home';
import InventoryList from './InventoryList';
import ProductDetail from './ProductDetail';
import AddInventory from './AddInventory';
import DDorganizer from './DDorganizer';
import NavBar from './NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: inventories };
    //{localPropName: importedPropName}
    //importedPropName = JSON in [], not {}
    //this.deleteItem = this.deleteItem.bind(this); 
    //this.addItem = this.addItem.bind(this);
  }



  //arrow function dont need bind!!
  deleteItem = (SKU) => {
    console.log("Before deleteItem: ", this.state.list);
    //init local scope's "locList" with existing prop: "list"
    let locList = [...this.state.list];
    const index = locList.findIndex(item => item.SKU === SKU);
    locList.splice(index, 1);
    this.setState({ list: locList });
    //preferred way to update state change, so Virtual DOM knows.
    //this.state.list = locList; //don't do direct assignment, Virtual DOM wont detect change.
    console.log("After deleteItem: ", this.state.list);
  }

  addItem = (newItem) => {
    console.log('Before addItem: newItem = ', newItem);
    this.setState(prevState => ({
      list: [...prevState.list, newItem]
    }), console.log('After addItem: list = ', this.state.list))
  }

  updateInventory = (SKU, updatedItem) => {
    console.log('Before update: ', this.state);
    this.setState(prevState => ({
      list: prevState.list.map(item => item.SKU === SKU ? { ...item, ...updatedItem } : item)
    }))
    console.log('After update: ', this.state);
  }

  setLocation = (SKU, newLocation) => {
    console.log('Before setLocation:', this.state.list);
    console.log("new loc", newLocation);
    // Use the prevState to update the location of the item
    this.setState((prevState) => {
      // Map through the list and update the location for the specific SKU
      const updatedList = prevState.list.map((item) =>
        item.SKU === SKU ? { ...item, location: newLocation } : item
      );
      return { list: updatedList };  // Return the new state with updated list
    }, () => {
      console.log('After setLocation:', this.state.list);
    });
  };

  render() {
    //console.log("render: ", this.state.list, "type: ", Array.isArray(this.state.list));
    return (
      <div id="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="React Grocery Store logo" />
          <h1>
            React Grocery Store
          </h1>
        </header>
        <main className="App-main" >
          <HashRouter>
            <NavBar></NavBar>
            <Routes>

              <Route
                path='/'
                element={<Home
                >{/*opening tag closed here*/}
                </Home >}
              ></Route>

              <Route
                path='/inventory'
                element={<InventoryList
                  invList={this.state.list}
                  delItem={this.deleteItem}
                  updateInv={this.updateInventory}
                >{/*opening tag closed here*/}
                </InventoryList >}
              ></Route>

              <Route
                path='/edit/:SKU'
                element={<ProductDetail
                  invList={this.state.list}
                  updateInv={this.updateInventory}
                  delItem={this.deleteItem}
                />}
              ></Route>

              <Route
                path='/add'
                element={<AddInventory
                  invList={this.state.list}
                  addItem={this.addItem}
                ></AddInventory>}
              ></Route>

              <Route
                path='/DDorganizer'
                element={<DDorganizer
                  invList={this.state.list}
                  setLoc={this.setLocation}
                ></DDorganizer>}
              ></Route>

              <Route
                path='/about'
                element={<><h1>About this App:</h1>
                  <p>Click on the inventory items to go to the detail page.</p>
                  <p>In the detail page, you can update all details of the selected item, except its SKU.</p>
                  <p>Click update to save the changes.</p>
                  <p>Click delete to delete the item.</p>
                  <p>Click back to get back to the inventory view.</p>
                  <p>Click on the Add item tab to add new item.</p>
                  <p>This is a Single Page Application made with React.</p>
                  <p>There is no database connected to the app, so all data will be lost upon page refresh.</p>
                </>}
              ></Route>

              <Route
                path='*'
                element={<h1>Invalid Page</h1>}
              ></Route>

            </Routes>
          </HashRouter>

          {/*pass down props in format: passedPropName = {this.state.locPropName} */}
          {/*pass down functions in format: passedPropName = {this.locFuncName} */}
          {/*thru within custom JSX tag as tag property; tag = importedFuncName */}

        </main>
      </div>
    );
  }
}
export default App;