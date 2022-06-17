import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { requestRobots, setSearchField } from '../actions';

const App = () => {

    let searchField = useSelector(state => state.searchRobots.searchField);
    let robots = useSelector(state => state.requestRobots.robots);
    let isPending = useSelector(state => state.requestRobots.isPending);
    const error = useSelector(state => state.requestRobots.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestRobots());
    }, [dispatch]);

    const onSearchChange = (e) => {
        dispatch(setSearchField(e.target.value));
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    return isPending ?
        <h1>Loading</h1>
        :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
}

export default App;