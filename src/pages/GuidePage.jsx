import React, { useEffect, useRef, useState } from 'react'
import GuideSelector from '../components/layout/GuideSelector'
import GuideHeading from '../components/ui/GuideHeading'
import GuideSubHeading from '../components/ui/GuideSubHeading'
import GuideHyperlink from '../components/ui/GuideHyperlink'
import clsx from 'clsx'

const GuidePage = () => {
    const [selected, setSelected] = useState("Overview")
    const refs = useRef([])
    const container = useRef()

    useEffect(() => {
        const onScroll = () => {
            let current = null;

            refs.current.forEach((el, i) => {
                if (el?.getBoundingClientRect().top <= 90) {
                    current = i;
                }
            });
            if(current){
                setSelected(refs.current[current].innerText)
            } else{
                setSelected("Overview")
            }
        };

        container.current.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div ref={container} className='w-full h-[calc(100vh-5rem)] mt-20 bg-white-primary flex text-red-dark  overflow-y-scroll scroll-smooth'>
            <GuideSelector selected={selected} setSelected={setSelected}/>
            <div className='w-full h-fit ml-80 px-8 pt-1 pb-6 flex flex-col gap-2 font-cascadia text-sm'>
                <div id="overview" className='bg-white-primary h-[1px] w-full'></div>
                <GuideHeading ref={el => {refs.current[0] = el}}>Overview</GuideHeading>
                <GuideSubHeading>Description</GuideSubHeading>
                <p>This web-based application is a 3D Assembly Station Simulation designed to represent the operation of an automated manufacturing system controlled by PLC logic. The simulation visualizes the interaction between mechanical components, sensors, actuators, and control logic in a virtual environment.</p>
                <p>The system is intended as a learning and exploration medium that bridges conceptual PLC programming with observable physical behavior, without requiring real industrial hardware.</p>
                <GuideSubHeading>Main Features</GuideSubHeading>
                <p>The application is divided into three primary features:</p>
                <p><b>Simulation Mode</b></p>
                <p>Displays the automatic assembly cycle, allowing users to observe how sensor states and actuator outputs change over time during a continuous workflow.</p>
                <p><b>Explore Mode</b></p>
                <p>Enables manual control of actuators to test mechanical responses and observe sensor feedback without automatic sequencing.</p>
                <p><b>PLC Editor</b></p>
                <p>Provides a PLC ladder logic editor where users can define control logic using inputs, outputs, and memory bits that directly affect the simulation.</p>
                <div id="simulation" className='bg-white-primary h-[1px] w-full'></div>
                <GuideHeading ref={el => {refs.current[1] = el}}>Simulation Mode</GuideHeading>
                <GuideSubHeading>Description</GuideSubHeading>
                <p>Simulation Mode is designed to visualize the automatic operating cycle of the assembly station. It allows users to observe how the system executes a predefined workflow, including the interaction between sensors, actuators, and control logic, without manual intervention.</p>
                <GuideSubHeading>Operating Principle</GuideSubHeading>
                <p>When Simulation Mode is active, the assembly station runs in a continuous cycle loop. During each cycle:</p>
                <ul className='list-disc pl-6'>
                    <li>Actuators operate automatically based on control logic</li>
                    <li>Sensors detect system conditions</li>
                    <li>Status indicators update in real time</li>
                    <li>The system resets and repeats the sequence</li>
                </ul>
                <p>The simulation represents a complete assembly workflow, which includes:</p>
                <ul className='list-decimal pl-8'>
                    <li>Body Preparation</li>
                    <li>Piston Assembly</li>
                    <li>Spring Assembly</li>
                    <li>Cap Installation</li>
                    <li>Send Finished Product</li>
                </ul>
                <p id="status-panel">This sequence repeats continuously, allowing users to observe state transitions and timing relationships between system elements.</p>
                <GuideSubHeading>Status Panel</GuideSubHeading>
                <p>The Status Panel provides real-time visual feedback of sensor states during the simulation and explore mode. It uses bulb-style indicators to represent binary logic conditions commonly used in PLC systems.</p>
                <ul className='list-disc pl-6'>
                    <li>ON (Lit) → Logic value 1</li>
                    <li>OFF (Unlit) → Logic value 0</li>
                </ul>
                <p>Each indicator corresponds directly to a sensor input used by the control system. These are the explanation of each indicator:</p>
                <p><b>Arm Busy</b></p>
                <p>Detects whether the arm is currently in motion or idle. Logic value = 1 when the arm is in motion, logic value = 0 when the arm is idle.</p>
                <p><b>Gripper Opened</b></p>
                <p>Detects whether the gripper is currently open or closed. Logic value = 1 when the gripper is open, logic value = 0 when the gripper is closed.</p>
                <p><b>Body Present</b></p>
                <p>Detects the presence of the body component at the pickup position. Logic value = 1 when the body is present, logic value = 0 when the body is not present.</p>
                <p><b>Piston Present</b></p>
                <p>Detects the presence of the piston component at the pickup position. Logic value = 1 when the piston is present, logic value = 0 when the piston is not present.</p>
                <p><b>Spring Present</b></p>
                <p>Detects the presence of the spring component at the pickup position. Logic value = 1 when the spring is present, logic value = 0 when the spring is not present.</p>
                <p><b>Cap Present</b></p>
                <p>Detects the presence of the cap component at the pickup position. Logic value = 1 when the cap is present, logic value = 0 when the cap is not present.</p>
                <div id="explore" className='bg-white-primary h-[1px] w-full'></div>
                <GuideHeading ref={el => {refs.current[2] = el}}>Explore Mode</GuideHeading>
                <GuideSubHeading>Description</GuideSubHeading>
                <p>Explore Mode allows users to manually interact with the assembly station by directly controlling actuators. Unlike Simulation Mode, the automatic cycle loop is disabled, enabling focused observation of individual actuator actions and sensor responses.</p>
                <p>This mode is intended for experimentation, testing, and understanding cause–effect relationships within the system.</p>
                <GuideSubHeading>Operating Principle</GuideSubHeading>
                <p>In Explore Mode, the system operates in a manual control state.</p>
                <ul className='list-disc pl-6'>
                    <li>Automatic sequencing is disabled</li>
                    <li>Actuators respond only to user commands through the control panel</li>
                    <li>Sensors remain active and update in real time</li>
                    <li>System logic does not advance automatically</li>
                </ul>
                <p>Each actuator activation immediately affects the mechanical model, and any resulting sensor state changes are reflected in the <GuideHyperlink href="#status-panel">Status Panel</GuideHyperlink>. This operating principle allows users to isolate system behavior without interference from predefined control logic.</p>
                <GuideSubHeading>Control Panel</GuideSubHeading>
                <p>The Control Panel provides direct access to actuator outputs through a set of control buttons. Each button control:</p>
                <ul className='list-disc pl-6'>
                    <li>Corresponds to a specific actuator output</li>
                    <li>Activates or deactivates the actuator while pressed or toggled</li>
                    <li>Produces immediate visual and sensor feedback in the simulation</li>
                </ul>
                <p>The Control Panel enables users to:</p>
                <ul className='list-disc pl-6'>
                    <li>Test actuator movement independently</li>
                    <li>Verify sensor detection behavior</li>
                    <li>Simulate manual operation and troubleshooting scenarios</li>
                </ul>
                <p>This design mirrors manual jog or test modes commonly found in industrial automation systems.</p>
                <div id="plc-editor" className='bg-white-primary h-[1px] w-full'></div>
                <GuideHeading ref={el => {refs.current[3] = el}}>PLC Editor</GuideHeading>
                <GuideSubHeading>Description</GuideSubHeading>
                <p>Editor Mode provides a PLC ladder logic environment for defining and controlling the behavior of the assembly station. In this feature, users create logical relationships between sensor inputs, actuator outputs, and internal memory bits using ladder logic.</p>
                <p>The logic executed in the editor influences how the simulation behaves when it runs, allowing users to connect abstract PLC programming concepts with observable system actions.</p>
                {/* <GuideSubHeading>Operating Principle</GuideSubHeading>
                <p>The PLC Editor operates based on a cyclic scan model, similar to standard industrial PLC systems. During each scan cycle:</p>
                <ul className='list-decimal pl-8'>
                    <li>Input states (sensors) are read</li>
                    <li>Ladder logic is evaluated from left to right, top to bottom</li>
                    <li>Output states (actuators) are updated</li>
                    <li>Memory bits are stored for the next scan</li>
                </ul>
                <p>This scan cycle repeats continuously while the simulation is active. Any changes made to the ladder logic affect the control behavior of the simulation.</p> */}
                <GuideSubHeading>Ladder Editor</GuideSubHeading>
                <p>The Ladder Editor is composed of three main elements: Inputs (I), Outputs (Q), and Memory (M). These elements represent the interface between the control logic and the simulated assembly station.</p>
                <p><b>Inputs (I)</b></p>
                <p>Inputs represent sensor signals that indicate system conditions within the assembly station.</p>
                <ul className='list-disc pl-6'>
                    <li>Each input corresponds to a sensor displayed in the <GuideHyperlink href="#status-panel">Status Panel</GuideHyperlink></li>
                    <li>Input states are binary (ON/OFF)</li>
                    <li>Inputs are read at the beginning of each scan cycle</li>
                </ul>
                <p>Inputs are used to trigger logic conditions and control the progression of the assembly process.</p>
                <p><b>Outputs (Q)</b></p>
                <p>Outputs represent actuator control signals that drive mechanical actions in the assembly station.</p>
                <ul className='list-disc pl-6'>
                    <li>Each output corresponds to a physical actuator</li>
                    <li>Output states are set by ladder logic</li>
                    <li>Changes in output states result in immediate visual motion in the simulation</li>
                </ul>
                <p>Outputs define how the system responds to detected conditions.</p>
                <p><b>Memory (M)</b></p>
                <p>Memory bits are internal control variables used to store logic states that are not directly tied to physical components. Memory elements are essential for managing complex assembly workflows.</p>
                <GuideSubHeading>Coil Types</GuideSubHeading>
                <p>The Ladder Editor supports two types of output coils to control actuator and memory states.</p>
                <p><b>Standard Output Coil ({"["})</b></p>
                <p>Sets the associated output or memory bit to ON when the ladder logic condition is true. When the condition becomes false, the coil returns to OFF.</p>
                <p><b>Reset Coil (R)</b></p>
                <p>Forces the associated output or memory bit to OFF when the ladder logic condition is true. This coil is commonly used to reset states, stop actions, or end a process step.</p>
                <p>These coil types allow users to implement basic control, state resetting, and simple sequencing logic within the ladder program.</p>
                <GuideSubHeading>Arm Movements Binary Outputs</GuideSubHeading>
                <p>Arm movement is controlled using three binary output bits (Q1, Q2, Q3). These outputs work together as a bit-coded position command. Each output represents a single bit. The combination of ON/OFF states determines the target position of the arm. The arm position is defined by the binary value formed by the three outputs:</p>
                <div className='w-1/2 my-2 grid grid-cols-[4fr_2fr_1fr_1fr_1fr] border-l-[1px] border-red-primary text-xs self-center gap-[2px]'>
                    <TableData heading={true}>Arm Position/Movement</TableData>
                    <TableData heading={true}>Binary</TableData>
                    <TableData heading={true}>Q3</TableData>
                    <TableData heading={true}>Q2</TableData>
                    <TableData heading={true}>Q1</TableData>

                    <TableData>Home Position</TableData>
                    <TableData>000</TableData>
                    <TableData>0</TableData>
                    <TableData>0</TableData>
                    <TableData>0</TableData>

                    <TableData>Pick Body</TableData>
                    <TableData>001</TableData>
                    <TableData>0</TableData>
                    <TableData>0</TableData>
                    <TableData>1</TableData>

                    <TableData>Assemble Body</TableData>
                    <TableData>010</TableData>
                    <TableData>0</TableData>
                    <TableData>1</TableData>
                    <TableData>0</TableData>

                    <TableData>Pick Piston</TableData>
                    <TableData>011</TableData>
                    <TableData>0</TableData>
                    <TableData>1</TableData>
                    <TableData>1</TableData>

                    <TableData>Assemble Piston/Spring</TableData>
                    <TableData>100</TableData>
                    <TableData>1</TableData>
                    <TableData>0</TableData>
                    <TableData>0</TableData>

                    <TableData>Pick Spring</TableData>
                    <TableData>101</TableData>
                    <TableData>1</TableData>
                    <TableData>0</TableData>
                    <TableData>1</TableData>

                    <TableData>Pick Cap</TableData>
                    <TableData>110</TableData>
                    <TableData>1</TableData>
                    <TableData>1</TableData>
                    <TableData>0</TableData>

                    <TableData>Assemble Cap & Send Product</TableData>
                    <TableData>111</TableData>
                    <TableData>1</TableData>
                    <TableData>1</TableData>
                    <TableData>1</TableData>
                </div>
                <p>Each binary combination corresponds to a unique arm position within the assembly station workflow.</p>
                <p><b>Control Behavior</b></p>
                <ul className='list-disc pl-6'>
                    <li>Only one position command is active at a time</li>
                    <li>Changing the output combination updates the arm target position</li>
                    <li>The arm moves automatically based on the current binary output state</li>
                    <li>Returning all outputs to OFF (000) commands the arm back to the home position</li>
                </ul>
                <p>This approach simplifies arm control by encoding multiple positions using binary logic, a method commonly used in PLC-controlled systems.</p>
                <GuideSubHeading>Run Simulation</GuideSubHeading>
                <p>The Run Simulation button toggles the execution state of the PLC ladder logic. When the button is pressed, the system enters Run Mode, where the ladder program is executed continuously and ladder editing is disabled to prevent logic changes during execution. While the simulation is running, ladder contacts and output coils update visually in real time according to current input, output, and memory states, allowing users to observe live logic behavior. Pressing the button again stops the simulation and returns the system to Edit Mode, where ladder elements become editable and logic modifications can be made safely.</p>
                <p><b>Run Mode Behavior</b></p>
                <p>While the simulation is running:</p>
                <ul className='list-disc pl-6'>
                    <li>This separation ensures safe and clear distinction between logic design and logic execution, similar to industrial PLC programming environments.</li>
                    <li>Output coils reflect real-time output conditions</li>
                    <li>Memory states are evaluated continuously</li>
                    <li>System behavior is synchronized with the 3D simulation</li>
                </ul>
                <p>These visual changes allow users to observe how ladder logic responds to live system states.</p>
                <p><b>Edit Mode Behavior</b></p>
                <p>When the simulation is stopped:</p>
                <ul className='list-disc pl-6'>
                    <li>Ladder editing is enabled</li>
                    <li>Ladder elements and 3D simulation return to the initial state</li>
                    <li>Logic can be modified without affecting system execution</li>
                </ul>
                <p>This separation ensures safe and clear distinction between logic design and logic execution, similar to industrial PLC programming environments.</p>
            </div>
        </div>
    )
}

const TableData = ({children, heading=false}) => {

    return (
        <p className={clsx(heading ? "bg-red-primary text-white" : "border-r-[1px] border-b-[1px] border-red-primary", "p-1 text-center")}>{children}</p>
    )
}

export default GuidePage