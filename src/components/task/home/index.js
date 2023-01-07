import React from 'react'
import TaskTable from '../taskComponents/taskTable'
import ButtonAppBar from './appBar'

function HomePage() {

    return (
        <div>
            <ButtonAppBar />
            <TaskTable />
        </div>
    )
}

export default HomePage